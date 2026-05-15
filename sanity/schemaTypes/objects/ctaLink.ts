import { defineField, defineType } from 'sanity'

export const ctaLink = defineType({
  name: 'ctaLink',
  title: 'CTA Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'href',
      title: 'Destination',
      type: 'string',
      description: 'Choose where this button should navigate.',
      options: {
        list: [
          { title: 'Home: About Section', value: '#about' },
          { title: 'Home: Achievements Section', value: '#achievement' },
          { title: 'Home: Academy Section', value: '#academy' },
          { title: 'Home: Management Section', value: '#management' },
          { title: 'Home: Events Section', value: '#events' },
          { title: 'Home: Gallery Section', value: '#gallery' },
          { title: 'Home: Admission Section', value: '#admission' },
          { title: 'Home: Careers Section', value: '#careers' },
          { title: 'Gallery Page', value: '/gallery' },
          { title: 'Events Page', value: '/events' },
          { title: 'Updates Page', value: '/updates' },
          { title: 'Terms of Use', value: '/terms-of-use' },
          { title: 'Privacy Policy', value: '/privacy-policy' },
        ],
      },
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open In New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true

      const cta = value as { label?: string; href?: string }
      const hasLabel = Boolean(cta.label?.trim())
      const hasHref = Boolean(cta.href?.trim())

      if ((hasLabel && !hasHref) || (!hasLabel && hasHref)) {
        return 'Provide both Label and Destination, or leave both empty.'
      }

      return true
    }),
})
