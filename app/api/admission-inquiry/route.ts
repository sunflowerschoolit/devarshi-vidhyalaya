import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { fetchFromSanity } from '@/lib/sanity/client'
import { admissionRecipientEmailQuery } from '@/lib/sanity/queries'

export const runtime = 'nodejs'
export const maxDuration = 30

const inquirySchema = z.object({
  studentName: z.string().trim().min(1).max(120),
  parentName: z.string().trim().min(1).max(120),
  contact: z.string().trim().regex(/^\d{10}$/),
  email: z
    .string()
    .trim()
    .email()
    .optional()
    .or(z.literal('')),
  applyingForStd: z.string().trim().min(1).max(40),
  currentStd: z.string().trim().max(40).optional().or(z.literal('')),
  currentSchool: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
  website: z.string().optional(),
})

function getRequiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

function isValidEmail(value: string) {
  return z.string().email().safeParse(value).success
}

type SiteSettingsEmailResult = {
  admissionToEmail?: string
}

async function resolveRecipientEmail() {
  try {
    const result = await fetchFromSanity<SiteSettingsEmailResult>(
      admissionRecipientEmailQuery,
      ['siteSettings']
    )
    const sanityEmail = result?.admissionToEmail?.trim()
    if (sanityEmail && isValidEmail(sanityEmail)) {
      return sanityEmail
    }
  } catch {
    // Ignore Sanity lookup failures and fallback to env/default.
  }

  const envEmail = process.env.ADMISSION_TO_EMAIL?.trim()
  if (envEmail && isValidEmail(envEmail)) {
    return envEmail
  }

  throw new Error('Missing or invalid ADMISSION_TO_EMAIL')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = inquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please enter valid form details.' }, { status: 400 })
    }

    const data = parsed.data

    // Honeypot field: if bots fill this hidden input, accept but ignore silently.
    if (data.website && data.website.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    const host = getRequiredEnv('SMTP_HOST')
    const port = Number(getRequiredEnv('SMTP_PORT'))
    const secure = process.env.SMTP_SECURE === 'true'
    const user = getRequiredEnv('SMTP_USER')
    const pass = getRequiredEnv('SMTP_PASS')
    const to = await resolveRecipientEmail()
    const from =
      process.env.ADMISSION_FROM_EMAIL ||
      process.env.SMTP_FROM ||
      `Devarshi Vidhyalaya Admissions <${user}>`

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })

    await transporter.sendMail({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `New Admission Inquiry: ${data.studentName} (${data.applyingForStd})`,
      text: [
        'New admission inquiry received.',
        '',
        `Student Name: ${data.studentName}`,
        `Parent/Guardian: ${data.parentName}`,
        `Contact: ${data.contact}`,
        `Email: ${data.email || 'Not provided'}`,
        `Std Applying For: ${data.applyingForStd}`,
        `Current Std: ${data.currentStd || 'Not provided'}`,
        `Current School: ${data.currentSchool || 'Not provided'}`,
        `Message: ${data.message || 'None'}`,
      ].join('\n'),
      html: `
        <h2>New Admission Inquiry</h2>
        <p><strong>Student Name:</strong> ${data.studentName}</p>
        <p><strong>Parent/Guardian:</strong> ${data.parentName}</p>
        <p><strong>Contact:</strong> ${data.contact}</p>
        <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
        <p><strong>Std Applying For:</strong> ${data.applyingForStd}</p>
        <p><strong>Current Std:</strong> ${data.currentStd || 'Not provided'}</p>
        <p><strong>Current School:</strong> ${data.currentSchool || 'Not provided'}</p>
        <p><strong>Message:</strong><br/>${(data.message || 'None').replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Admission inquiry email error:', error)
    return NextResponse.json(
      { error: 'Unable to submit inquiry at the moment. Please try again later.' },
      { status: 500 }
    )
  }
}
