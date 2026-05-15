import Link from 'next/link'
import Image from 'next/image'
import { Images, ArrowRight } from 'lucide-react'
import { getVideoEmbedUrl, isDirectVideoUrl } from '@/lib/media'

type GalleryPreviewImage = {
  mediaType: 'image' | 'video'
  alt: string
  caption?: string
  src?: string
  videoUrl?: string
}

type GalleryPreviewSectionProps = {
  images?: GalleryPreviewImage[]
}

export default function GalleryPreviewSection({ images }: GalleryPreviewSectionProps) {
  const previewImages = images ?? []

  if (previewImages.length === 0) return null

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-4 py-1 bg-[oklch(0.92_0.04_25)] text-[oklch(0.36_0.13_25)] text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              Photo Gallery
            </span>
            <h2 className="font-serif font-black text-[oklch(0.20_0.02_30)] text-3xl lg:text-4xl text-balance">
              A Glimpse of Life at Devarshi
            </h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-2 px-6 py-3 bg-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.26_0.11_25)] text-white font-semibold text-sm rounded-full transition-colors whitespace-nowrap shadow-md"
          >
            <Images className="w-4 h-4" />
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((img, i) => (
            <div
              key={`${img.mediaType}-${img.src || img.videoUrl || i}`}
              className={`group relative overflow-hidden rounded-2xl ${i === 0 || i === 3 ? 'aspect-video' : 'aspect-square'}`}
            >
              {img.mediaType === 'video' && img.videoUrl ? (
                (() => {
                  const embedUrl = getVideoEmbedUrl(img.videoUrl)
                  const canUseDirectVideo = isDirectVideoUrl(img.videoUrl)

                  if (embedUrl) {
                    return (
                      <iframe
                        src={embedUrl}
                        title={img.caption || img.alt}
                        className="w-full h-full border-0 bg-black"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    )
                  }

                  if (canUseDirectVideo) {
                    return (
                      <video controls preload="metadata" className="w-full h-full object-cover bg-black">
                        <source src={img.videoUrl} />
                        Your browser does not support the video tag.
                      </video>
                    )
                  }

                  return (
                    <a
                      href={img.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center text-xs font-semibold underline text-[oklch(0.36_0.13_25)] bg-white"
                    >
                      Open Video
                    </a>
                  )
                })()
              ) : img.src ? (
                <>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[oklch(0.20_0.02_30)]/0 group-hover:bg-[oklch(0.20_0.02_30)]/40 transition-all duration-300 flex items-end p-4">
                    <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      {img.caption || img.alt}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>

        {/* View more CTA */}
        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[oklch(0.76_0.13_80)] hover:bg-[oklch(0.62_0.13_78)] text-[oklch(0.20_0.02_30)] font-bold rounded-full transition-colors shadow-lg text-sm"
          >
            Explore the Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
