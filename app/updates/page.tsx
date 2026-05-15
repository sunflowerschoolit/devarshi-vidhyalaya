import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { fetchFromSanity } from "@/lib/sanity/client";
import { allSchoolUpdatesQuery } from "@/lib/sanity/queries";
import type { SchoolUpdateItem } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "School Updates – Devarshi Vidhyalaya",
  description:
    "Read all school updates including activities, announcements, achievements, and important notices.",
};

export default async function UpdatesPage() {
  const updates = await fetchFromSanity<SchoolUpdateItem[]>(
    allSchoolUpdatesQuery,
    ["schoolUpdateItem"],
  );

  const list = updates ?? [];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[oklch(0.36_0.13_25)] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-8 h-8 text-[oklch(0.76_0.13_80)]" />
            <h1 className="font-serif font-black text-3xl lg:text-4xl">
              School Updates
            </h1>
          </div>
          <p className="text-white/75 text-sm">
            Explore all recent activities, announcements, and achievements.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {list.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {list.map((item) => (
              <article
                key={item._id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-[oklch(0.36_0.13_25)]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={item.coverImageUrl}
                    alt={item.coverImageAlt || item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[oklch(0.92_0.04_25)] text-[oklch(0.36_0.13_25)]">
                      {item.kind}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[oklch(0.76_0.13_80)]/30 text-[oklch(0.26_0.11_25)]">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date(item.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-lg mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {item.excerpt}
                  </p>
                  {item.hasDetails ? (
                    <Link
                      href={`/updates/${item.slug}`}
                      className="inline-flex items-center gap-1 text-[oklch(0.36_0.13_25)] text-sm font-semibold group-hover:gap-2 transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read article <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <p className="text-muted-foreground">
              No school updates available.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
