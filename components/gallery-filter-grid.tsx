"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { getVideoEmbedUrl, isDirectVideoUrl } from "@/lib/media";

type GalleryImage = {
  mediaType: "image" | "video";
  alt: string;
  category: string;
  caption?: string;
  src?: string;
  videoUrl?: string;
};

type GalleryFilterGridProps = {
  images: GalleryImage[];
};

export default function GalleryFilterGrid({ images }: GalleryFilterGridProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((img) => img.category)))],
    [images],
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = useMemo(
    () =>
      activeCategory === "All"
        ? images
        : images.filter((img) => img.category === activeCategory),
    [images, activeCategory],
  );

  return (
    <>
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="navigation"
        aria-label="Gallery categories"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              activeCategory === cat
                ? "bg-[oklch(0.36_0.13_25)] text-white border-[oklch(0.36_0.13_25)]"
                : "bg-white border-border text-muted-foreground hover:border-[oklch(0.36_0.13_25)] hover:text-[oklch(0.36_0.13_25)]"
            }`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredImages.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filteredImages.map((img, i) => (
            <figure
              key={`${img.mediaType}-${img.src || img.videoUrl || i}`}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-muted"
            >
              <div className="relative">
                {img.mediaType === "video" && img.videoUrl ? (
                  (() => {
                    const embedUrl = getVideoEmbedUrl(img.videoUrl);
                    const canUseDirectVideo = isDirectVideoUrl(img.videoUrl);

                    if (embedUrl) {
                      return (
                        <iframe
                          src={embedUrl}
                          title={img.caption || img.alt}
                          className="w-full aspect-video border-0 bg-black"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      );
                    }

                    if (canUseDirectVideo) {
                      return (
                        <video
                          controls
                          preload="metadata"
                          className="w-full h-auto bg-black"
                        >
                          <source src={img.videoUrl} />
                          Your browser does not support the video tag.
                        </video>
                      );
                    }

                    return (
                      <a
                        href={img.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-6 text-sm text-[oklch(0.36_0.13_25)] underline"
                      >
                        Open video
                      </a>
                    );
                  })()
                ) : img.src ? (
                  <>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={600}
                      height={400}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[oklch(0.20_0.02_30)]/0 group-hover:bg-[oklch(0.20_0.02_30)]/50 transition-all duration-300 flex flex-col justify-end p-4">
                      <figcaption className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {img.caption}
                      </figcaption>
                      <span className="text-white/70 text-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        {img.category}
                      </span>
                    </div>
                  </>
                ) : null}
              </div>
              {img.mediaType === "video" ? (
                <figcaption className="p-3 text-sm text-muted-foreground">
                  {img.caption || img.alt}
                </figcaption>
              ) : null}
              {img.mediaType === "video" ? (
                <div className="px-3 pb-3 text-xs text-muted-foreground">
                  {img.category}
                </div>
              ) : null}
            </figure>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card border border-border rounded-2xl">
          <p className="text-muted-foreground text-sm">
            No media found for this category.
          </p>
        </div>
      )}
    </>
  );
}
