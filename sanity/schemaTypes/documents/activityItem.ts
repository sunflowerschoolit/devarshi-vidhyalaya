import { defineField, defineType } from 'sanity'

const ACTIVITY_TYPES = [
  { title: 'Academic', value: 'Academic' },
  { title: 'Co-curricular', value: 'Co-curricular' },
  { title: 'Sports', value: 'Sports' },
  { title: 'Culture', value: 'Culture' },
  { title: 'Community', value: 'Community' },
  { title: 'Club', value: 'Club' },
]

export const activityItem = defineType({
  name: 'activityItem',
  title: 'Activity Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Activity Type',
      type: 'string',
      options: { list: ACTIVITY_TYPES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required().max(160),
        }),
      ],
    }),
    defineField({
      name: 'activityDate',
      title: 'Activity Date',
      type: 'date',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature On Homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'image',
    },
  },
})
