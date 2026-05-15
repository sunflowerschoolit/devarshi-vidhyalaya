import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Global Settings',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'admissionToEmail',
      title: 'Admission Recipient Email',
      description: 'Form submissions from Admission Inquiry are sent to this email.',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'careerToEmail',
      title: 'Career Recipient Email',
      description: 'Form submissions from Career Application are sent to this email.',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      admissionToEmail: 'admissionToEmail',
      careerToEmail: 'careerToEmail',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings',
        subtitle: `${selection.admissionToEmail || '-'} | ${selection.careerToEmail || '-'}`,
      }
    },
  },
})
