import { defineField, defineType } from 'sanity'

const UPDATE_CATEGORIES = [
  { title: 'Academic', value: 'Academic' },
  { title: 'Sports', value: 'Sports' },
  { title: 'Culture', value: 'Culture' },
  { title: 'Admission', value: 'Admission' },
  { title: 'General', value: 'General' },
]

const UPDATE_KINDS = [
  { title: 'News', value: 'News' },
  { title: 'Activity', value: 'Activity' },
]

export const schoolUpdateItem = defineType({
  name: 'schoolUpdateItem',
  title: 'School Update Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Update Kind',
      type: 'string',
      options: { list: UPDATE_KINDS },
      initialValue: 'News',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: UPDATE_CATEGORIES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(260),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.max(160),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              validation: (Rule) => Rule.max(180),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature In School Updates',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'kind',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? `${subtitle} update` : 'School update',
      }
    },
  },
})
