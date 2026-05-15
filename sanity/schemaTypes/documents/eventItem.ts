import { defineField, defineType } from 'sanity'

const EVENT_TYPES = [
  { title: 'Academic', value: 'Academic' },
  { title: 'Sports', value: 'Sports' },
  { title: 'Culture', value: 'Culture' },
  { title: 'Admission', value: 'Admission' },
  { title: 'Camp', value: 'Camp' },
  { title: 'General', value: 'General' },
]

export const eventItem = defineType({
  name: 'eventItem',
  title: 'Event Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      description: 'Optional. Use for multi-day events.',
      type: 'date',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value) return true
          const startDate = (context.document as { startDate?: string })?.startDate
          if (!startDate) return true
          return value >= startDate || 'End Date must be on or after Start Date'
        }),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'Optional. Example: 9:00 AM',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'Optional. Example: 1:00 PM',
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: EVENT_TYPES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(260),
    }),
  ],
  orderings: [
    {
      title: 'Start Date (Soonest First)',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      endDate: 'endDate',
      startTime: 'startTime',
      endTime: 'endTime',
    },
    prepare(selection) {
      const { title, startDate, endDate, startTime, endTime } = selection as {
        title?: string
        startDate?: string
        endDate?: string
        startTime?: string
        endTime?: string
      }
      const dateText =
        startDate && endDate && endDate !== startDate ? `${startDate} to ${endDate}` : startDate || 'No date'
      const timeText = startTime && endTime ? `${startTime} - ${endTime}` : startTime || 'All Day'
      return {
        title,
        subtitle: `${dateText} • ${timeText}`,
      }
    },
  },
})
