import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { fetchFromSanity } from '@/lib/sanity/client'
import { careerRecipientEmailQuery } from '@/lib/sanity/queries'

export const runtime = 'nodejs'
export const maxDuration = 30

const careerInquirySchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  qualification: z.string().trim().min(1).max(120),
  experienceYears: z.coerce.number().min(0).max(80),
  phone: z.string().trim().regex(/^\d{10}$/),
  email: z.string().trim().email(),
  address: z.string().trim().min(1).max(500),
  message: z.string().trim().max(1500).optional().or(z.literal('')),
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
  careerToEmail?: string
}

async function resolveRecipientEmail() {
  try {
    const result = await fetchFromSanity<SiteSettingsEmailResult>(
      careerRecipientEmailQuery,
      ['siteSettings']
    )
    const sanityEmail = result?.careerToEmail?.trim()
    if (sanityEmail && isValidEmail(sanityEmail)) {
      return sanityEmail
    }
  } catch {
    // Ignore Sanity lookup failures and fallback to env/default.
  }

  const envEmail = process.env.CAREER_TO_EMAIL?.trim()
  if (envEmail && isValidEmail(envEmail)) {
    return envEmail
  }

  throw new Error('Missing or invalid CAREER_TO_EMAIL')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = careerInquirySchema.safeParse(body)

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
      `Devarshi Vidhyalaya Careers <${user}>`

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
      replyTo: data.email,
      subject: `New Career Application: ${data.fullName}`,
      text: [
        'New career application received.',
        '',
        `Full Name: ${data.fullName}`,
        `Qualification: ${data.qualification}`,
        `Experience (Years): ${data.experienceYears}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Address: ${data.address}`,
        `Message: ${data.message || 'None'}`,
      ].join('\n'),
      html: `
        <h2>New Career Application</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Qualification:</strong> ${data.qualification}</p>
        <p><strong>Experience (Years):</strong> ${data.experienceYears}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Message:</strong><br/>${(data.message || 'None').replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Career inquiry email error:', error)
    return NextResponse.json(
      { error: 'Unable to submit application at the moment. Please try again later.' },
      { status: 500 }
    )
  }
}
