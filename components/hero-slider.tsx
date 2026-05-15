'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type HeroSlideItem = {
  src: string
  alt: string
  heading: string
  subheading?: string
  badgeText?: string
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
}

const defaultSlides: HeroSlideItem[] = [
  {
    src: '/images/hero1.jpg',
    alt: 'Devarshi Vidhyalaya campus',
    heading: 'Welcome to Devarshi Vidhyalaya',
    subheading: 'Knowledge. Character. Vision. A school built on tradition and forward thinking.',
    badgeText: 'Admissions Open',
    primaryCta: {
      label: 'Apply for Admission',
      href: '#admission',
    },
    secondaryCta: {
      label: 'Explore Academy',
      href: '#academy',
    },
  },
  {
    src: '/images/hero2.jpg',
    alt: 'Students engaged in a bright and modern classroom',
    heading: 'Excellence in Every Classroom',
    subheading: 'A holistic curriculum designed to spark curiosity and build character.',
    primaryCta: {
      label: 'Our Academy',
      href: '#academy',
    },
  },
  {
    src: '/images/hero3.jpg',
    alt: 'Students participating in school sports day on a green field',
    heading: 'Beyond Books – Whole-Child Growth',
    subheading: 'Sports, arts, culture, and leadership – woven into daily school life.',
    primaryCta: {
      label: 'See Activities',
      href: '#events',
    },
  },
]

type HeroSliderProps = {
  slides?: HeroSlideItem[]
}

export default function HeroSlider({ slides: cmsSlides }: HeroSliderProps) {
  const slides = cmsSlides && cmsSlides.length > 0 ? cmsSlides : defaultSlides
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 600)
    },
    [isAnimating]
  )

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5500)
    return () => clearInterval(timer)
  }, [next])

  useEffect(() => {
    if (current >= slides.length) setCurrent(0)
  }, [slides.length, current])

  const handleCtaClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    window.location.href = href
  }

  const safeIndex = Math.min(current, slides.length - 1)
  const slide = slides[safeIndex] ?? slides[0]
  if (!slide) return null
  const hasPrimaryCta = Boolean(slide.primaryCta?.label && slide.primaryCta?.href)
  const hasSecondaryCta = Boolean(slide.secondaryCta?.label && slide.secondaryCta?.href)

  return (
    <section
      className="relative w-full pt-28 pb-20 lg:pt-36 lg:pb-28 bg-[oklch(0.97_0.015_85)] overflow-hidden"
      aria-label="School highlights"
      aria-roledescription="carousel"
    >
      {/* Decorative gold accent band */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[oklch(0.76_0.13_80)] via-[oklch(0.36_0.13_25)] to-[oklch(0.76_0.13_80)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            {slide.badgeText ? (
              <span className="inline-block px-3 py-1 mb-5 bg-[oklch(0.76_0.13_80)] text-[oklch(0.20_0.02_30)] text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
                {slide.badgeText}
              </span>
            ) : null}
            <h1
              key={`h-${safeIndex}`}
              className="font-serif font-black text-[oklch(0.20_0.02_30)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {slide.heading}
            </h1>
            <div className="w-16 h-0.5 bg-[oklch(0.36_0.13_25)] mb-6" />
            {slide.subheading ? (
              <p
                key={`s-${safeIndex}`}
                className="font-sans text-[oklch(0.20_0.02_30)]/75 text-base lg:text-lg leading-relaxed mb-8 max-w-xl animate-in fade-in duration-700"
              >
                {slide.subheading}
              </p>
            ) : null}
            {hasPrimaryCta || hasSecondaryCta ? (
              <div className="flex flex-wrap gap-3 mb-10">
                {hasPrimaryCta ? (
                  <button
                    onClick={() => handleCtaClick(slide.primaryCta!.href)}
                    className="px-7 py-3 bg-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.26_0.11_25)] text-white font-semibold rounded-md transition-colors shadow-sm text-sm"
                  >
                    {slide.primaryCta!.label}
                  </button>
                ) : null}
                {hasSecondaryCta ? (
                  <button
                    onClick={() => handleCtaClick(slide.secondaryCta!.href)}
                    className="px-7 py-3 border border-[oklch(0.36_0.13_25)] text-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.36_0.13_25)] hover:text-white font-semibold rounded-md transition-colors text-sm"
                  >
                    {slide.secondaryCta!.label}
                  </button>
                ) : null}
              </div>
            ) : null}

            {/* Dots */}
            <div className="flex items-center gap-3" role="tablist" aria-label="Slide indicators">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-9 h-9 flex items-center justify-center rounded-md border border-[oklch(0.36_0.13_25)]/30 text-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.36_0.13_25)] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={i === safeIndex}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    'transition-all duration-300 h-1.5 rounded-full',
                    i === safeIndex
                      ? 'w-8 bg-[oklch(0.36_0.13_25)]'
                      : 'w-3 bg-[oklch(0.36_0.13_25)]/25 hover:bg-[oklch(0.36_0.13_25)]/50'
                  )}
                />
              ))}
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-9 h-9 flex items-center justify-center rounded-md border border-[oklch(0.36_0.13_25)]/30 text-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.36_0.13_25)] hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-full h-full border-2 border-[oklch(0.76_0.13_80)] rounded-md hidden sm:block" aria-hidden="true" />
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] w-full rounded-md overflow-hidden shadow-xl">
              {slides.map((s, i) => (
                <Image
                  key={i}
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={cn(
                    'object-cover transition-opacity duration-700',
                    i === safeIndex ? 'opacity-100' : 'opacity-0'
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.20_0.02_30)]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
