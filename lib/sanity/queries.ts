export const heroSlidesQuery = `
*[_type == "heroSlide" && isActive == true] | order(order asc) {
  _id,
  title,
  heading,
  subheading,
  badgeText,
  order,
  isActive,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  primaryCta,
  secondaryCta
}`

export const featuredSchoolUpdatesQuery = `
*[_type == "schoolUpdateItem" && isFeatured == true] | order(publishedAt desc)[0...7] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  kind,
  category,
  excerpt,
  "hasDetails": defined(body[0]),
  isFeatured,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt
}`

export const allSchoolUpdatesQuery = `
*[_type == "schoolUpdateItem"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  kind,
  category,
  excerpt,
  "hasDetails": defined(body[0]),
  isFeatured,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt
}`

export const schoolUpdateBySlugQuery = (slug: string) => `
*[_type == "schoolUpdateItem" && slug.current == "${slug}"][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  kind,
  category,
  excerpt,
  isFeatured,
  body,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt
}`

export const upcomingEventsQuery = `
*[
  _type == "eventItem" &&
  coalesce(endDate, startDate, eventDate) >= string::split(now(), "T")[0]
] | order(coalesce(startDate, eventDate) asc)[0...6] {
  _id,
  title,
  "startDate": coalesce(startDate, eventDate),
  endDate,
  startTime,
  endTime,
  venue,
  type,
  summary
}`

export const allUpcomingEventsQuery = `
*[
  _type == "eventItem" &&
  coalesce(endDate, startDate, eventDate) >= string::split(now(), "T")[0]
] | order(coalesce(startDate, eventDate) asc) {
  _id,
  title,
  "startDate": coalesce(startDate, eventDate),
  endDate,
  startTime,
  endTime,
  venue,
  type,
  summary
}`

export const featuredGalleryQuery = `
*[_type == "galleryItem" && isFeatured == true] | order(order asc, eventDate desc)[0...12] {
  _id,
  title,
  mediaType,
  videoUrl,
  category,
  caption,
  eventDate,
  isFeatured,
  order,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
}`

export const allGalleryItemsQuery = `
*[_type == "galleryItem"] | order(order asc, eventDate desc) {
  _id,
  title,
  mediaType,
  videoUrl,
  category,
  caption,
  eventDate,
  isFeatured,
  order,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
}`

export const teamMembersQuery = `
*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  memberType,
  bio,
  specialisation,
  email,
  linkedinUrl,
  featured,
  order,
  "photoUrl": photo.asset->url,
  "photoAlt": photo.alt
}`

export const admissionRecipientEmailQuery = `
*[_type == "siteSettings"][0] {
  admissionToEmail
}`

export const careerRecipientEmailQuery = `
*[_type == "siteSettings"][0] {
  careerToEmail
}`
