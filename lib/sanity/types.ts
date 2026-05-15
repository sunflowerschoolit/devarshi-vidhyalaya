export type CtaLink = {
  label: string
  href: string
  openInNewTab?: boolean
}

export type HeroSlide = {
  _id: string
  title: string
  heading: string
  subheading?: string
  badgeText?: string
  imageUrl: string
  imageAlt?: string
  order: number
  isActive: boolean
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
}

export type SchoolUpdateItem = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  kind: 'News' | 'Activity'
  category: string
  excerpt: string
  hasDetails: boolean
  coverImageUrl: string
  coverImageAlt: string
  isFeatured: boolean
}

export type EventItem = {
  _id: string
  title: string
  startDate: string
  endDate?: string
  startTime?: string
  endTime?: string
  venue?: string
  type: string
  summary?: string
}

export type GalleryItem = {
  _id: string
  title: string
  mediaType: 'image' | 'video'
  imageUrl?: string
  imageAlt?: string
  videoUrl?: string
  category: string
  caption: string
  eventDate?: string
  isFeatured: boolean
  order: number
}

export type TeamMember = {
  _id: string
  name: string
  role: string
  memberType: 'leadership' | 'teaching' | 'management'
  photoUrl: string
  photoAlt: string
  bio?: string
  specialisation?: string
  email?: string
  linkedinUrl?: string
  featured: boolean
  order: number
}
