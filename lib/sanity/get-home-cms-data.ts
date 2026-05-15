import { fetchFromSanity, isSanityConfigured } from './client'
import {
  featuredGalleryQuery,
  featuredSchoolUpdatesQuery,
  heroSlidesQuery,
  teamMembersQuery,
  upcomingEventsQuery,
} from './queries'
import type { EventItem, GalleryItem, HeroSlide, SchoolUpdateItem, TeamMember } from './types'

export type HomeCmsData = {
  heroSlides: HeroSlide[]
  featuredSchoolUpdates: SchoolUpdateItem[]
  upcomingEvents: EventItem[]
  featuredGallery: GalleryItem[]
  teamMembers: TeamMember[]
}

export async function getHomeCmsData(): Promise<HomeCmsData | null> {
  if (!isSanityConfigured()) return null

  const [heroSlides, featuredSchoolUpdates, upcomingEvents, featuredGallery, teamMembers] =
    await Promise.all([
      fetchFromSanity<HeroSlide[]>(heroSlidesQuery, ['heroSlide']),
      fetchFromSanity<SchoolUpdateItem[]>(featuredSchoolUpdatesQuery, ['schoolUpdateItem']),
      fetchFromSanity<EventItem[]>(upcomingEventsQuery, ['eventItem']),
      fetchFromSanity<GalleryItem[]>(featuredGalleryQuery, ['galleryItem']),
      fetchFromSanity<TeamMember[]>(teamMembersQuery, ['teamMember']),
    ])

  return {
    heroSlides: heroSlides ?? [],
    featuredSchoolUpdates: featuredSchoolUpdates ?? [],
    upcomingEvents: upcomingEvents ?? [],
    featuredGallery: featuredGallery ?? [],
    teamMembers: teamMembers ?? [],
  }
}
