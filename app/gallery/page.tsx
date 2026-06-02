import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Images } from 'lucide-react'
import { fetchFromSanity } from '@/lib/sanity/client'
import { allGalleryItemsQuery } from '@/lib/sanity/queries'
import type { GalleryItem } from '@/lib/sanity/types'
import GalleryFilterGrid from '@/components/gallery-filter-grid'

export const metadata: Metadata = {
  title: 'Photo Gallery – Devarshi Vidhyalaya',
  description:
    'Browse photos from events, classroom activities, sports days, cultural programmes, and more at Devarshi Vidhyalaya.',
}

const fallbackGalleryImages = [
  { mediaType: 'image' as const, src: '/images/gallery1.jpg', alt: 'Students at the Science Fair presenting their experiments', category: 'Academics', caption: 'Science Fair 2026' },
  { mediaType: 'image' as const, src: '/images/gallery2.jpg', alt: 'Students performing at Utsav cultural fest 2026', category: 'Culture', caption: 'Utsav 2026 Cultural Fest' },
  { mediaType: 'image' as const, src: '/images/gallery3.jpg', alt: 'Annual Sports Day race on the school track', category: 'Sports', caption: 'Annual Sports Day' },
  { mediaType: 'image' as const, src: '/images/gallery4.jpg', alt: 'Students working in the computer science lab', category: 'Infrastructure', caption: 'Computer Science Lab' },
  { mediaType: 'image' as const, src: '/images/gallery5.jpg', alt: 'Students reading in the school library', category: 'Infrastructure', caption: 'School Library' },
  { mediaType: 'image' as const, src: '/images/gallery6.jpg', alt: 'Students creating art in the art studio', category: 'Culture', caption: 'Art Studio Session' },
  { mediaType: 'image' as const, src: '/images/hero1.jpg', alt: 'Devarshi Vidhyalaya campus view', category: 'Infrastructure', caption: 'School Campus' },
  { mediaType: 'image' as const, src: '/images/hero2.jpg', alt: 'Students engaged in modern classroom learning', category: 'Academics', caption: 'Interactive Classroom Learning' },
  { mediaType: 'image' as const, src: '/images/hero3.jpg', alt: 'Students on the sports field', category: 'Sports', caption: 'School Sports Ground' },
]

const gallerySocialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/devarshi_vidhyalay' },
  { label: 'Instagram', href: 'https://www.instagram.com/devarshi_vidhyalay' },
  { label: 'YouTube', href: 'https://www.youtube.com/@devarshividhyalaya' },
]

export default async function GalleryPage() {
  const cmsGalleryItems = await fetchFromSanity<GalleryItem[]>(allGalleryItemsQuery, ['galleryItem'])
  const galleryMedia =
    cmsGalleryItems && cmsGalleryItems.length > 0
      ? cmsGalleryItems
          .filter(
            (item) =>
              (item.mediaType === 'image' && item.imageUrl) ||
              (item.mediaType === 'video' && item.videoUrl),
          )
          .map((item) => ({
            mediaType: item.mediaType,
            src: item.imageUrl,
            videoUrl: item.videoUrl,
            alt: item.imageAlt || item.caption || item.title || "Gallery image",
            category: item.category,
            caption: item.caption,
          }))
      : fallbackGalleryImages

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[oklch(0.36_0.13_25)] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Images className="w-8 h-8 text-[oklch(0.76_0.13_80)]" />
            <h1 className="font-serif font-black text-3xl lg:text-4xl">Photo Gallery</h1>
          </div>
          <p className="text-white/70 text-base max-w-2xl">
            Moments captured from the vibrant life at Devarshi Vidhyalaya – academics, sports,
            culture, and much more.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GalleryFilterGrid images={galleryMedia} />

        {/* CTA */}
        <div className="text-center mt-16 py-12 bg-[oklch(0.92_0.04_25)] rounded-3xl">
          <h2 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-2xl mb-3">
            Want to see more?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Follow us on social media for daily updates and behind-the-scenes moments.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {gallerySocialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border-2 border-[oklch(0.36_0.13_25)] text-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.36_0.13_25)] hover:text-white font-semibold rounded-full transition-colors text-sm"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
