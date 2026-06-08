import Header from '@/components/header'
import HeroSlider from '@/components/hero-slider'
import AboutSection from '@/components/about-section'
import AcademySection from '@/components/academy-section'
import ManagementSection from '@/components/management-section'
import EventsSection from '@/components/events-section'
import GalleryPreviewSection from '@/components/gallery-preview-section'
import CareersSection from '@/components/careers-section'
import AdmissionSection from '@/components/admission-section'
import Footer from '@/components/footer'
import { getHomeCmsData } from '@/lib/sanity/get-home-cms-data'

function formatEventDateParts(dateValue: string) {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return { day: '', month: '' }
  return {
    day: String(date.getDate()),
    month: date.toLocaleString('en-US', { month: 'short' }),
  }
}

function formatEventDateLabel(startDate: string, endDate?: string) {
  const start = new Date(startDate)
  if (Number.isNaN(start.getTime())) return ''
  const startText = start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  if (!endDate) return startText
  const end = new Date(endDate)
  if (Number.isNaN(end.getTime())) return startText
  const endText = end.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  if (startText === endText) return startText
  return `${startText} - ${endText}`
}

function formatEventTime(startTime?: string, endTime?: string) {
  if (startTime && endTime) return `${startTime} - ${endTime}`
  if (startTime) return startTime
  return 'All Day'
}

export default async function Home() {
  const cmsData = await getHomeCmsData()

  const heroSlides =
    cmsData && cmsData.heroSlides.length > 0
      ? cmsData.heroSlides.map((slide) => ({
          src: slide.imageUrl,
          alt: slide.imageAlt || slide.heading || 'Devarshi Vidhyalaya hero slide',
          heading: slide.heading,
          subheading: slide.subheading || undefined,
          primaryCta: slide.primaryCta,
          badgeText: slide.badgeText,
          secondaryCta: slide.secondaryCta,
        }))
      : undefined

  const schoolUpdateItems =
    cmsData && cmsData.featuredSchoolUpdates.length > 0
      ? cmsData.featuredSchoolUpdates.slice(0, 6).map((item) => ({
          slug: item.slug,
          date: new Date(item.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          kind: item.kind,
          category: item.category,
          hasDetails: item.hasDetails,
          title: item.title,
          excerpt: item.excerpt,
          image: item.coverImageUrl,
        }))
      : undefined
  const hasMoreUpdates = Boolean(cmsData && cmsData.featuredSchoolUpdates.length > 6)

  const eventItems =
    cmsData && cmsData.upcomingEvents.length > 0
      ? cmsData.upcomingEvents.slice(0, 5).map((event) => {
          const dateParts = formatEventDateParts(event.startDate)
          return {
            date: dateParts,
            dateLabel: formatEventDateLabel(event.startDate, event.endDate),
            title: event.title,
            time: formatEventTime(event.startTime, event.endTime),
            venue: event.venue,
            type: event.type,
            summary: event.summary,
          }
        })
      : undefined
  const hasMoreEvents = Boolean(cmsData && cmsData.upcomingEvents.length > 5)

  const galleryImages =
    cmsData && cmsData.featuredGallery.length > 0
      ? cmsData.featuredGallery
          .filter(
            (item) =>
              (item.mediaType === 'image' && item.imageUrl) ||
              (item.mediaType === 'video' && item.videoUrl),
          )
          .slice(0, 12)
          .map((item) => ({
            mediaType: item.mediaType,
            src: item.imageUrl,
            videoUrl: item.videoUrl,
            alt: item.imageAlt || item.caption || item.title || "Gallery image",
            caption: item.caption,
          }))
      : undefined

  const leadership =
    cmsData && cmsData.teamMembers.length > 0
      ? cmsData.teamMembers
          .filter((person) => person.memberType === 'leadership')
          .map((person) => ({
            name: person.name,
            role: person.role,
            image: person.photoUrl,
            bio: person.bio || '',
            featured: person.featured,
            email: person.email,
            phone: person.phone,
            linkedinUrl: person.linkedinUrl,
          }))
      : undefined

  const teachers =
    cmsData && cmsData.teamMembers.length > 0
      ? cmsData.teamMembers
          .filter((person) => person.memberType === 'teaching')
          .map((person) => ({
            name: person.name,
            role: person.role,
            image: person.photoUrl,
            specialisation: person.specialisation || '',
          }))
      : undefined

  return (
    <>
      <Header />
      <main>
        <HeroSlider slides={heroSlides} />
        <AboutSection />
        <AcademySection />
        <ManagementSection leadership={leadership} teachers={teachers} />
        <EventsSection
          schoolUpdateItems={schoolUpdateItems}
          eventItems={eventItems}
          hasMoreUpdates={hasMoreUpdates}
          hasMoreEvents={hasMoreEvents}
        />
        <GalleryPreviewSection images={galleryImages} />
        <AdmissionSection />
        <CareersSection />
      </main>
      <Footer />
    </>
  )
}
