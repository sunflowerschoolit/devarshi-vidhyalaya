import type { Metadata } from "next";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";
import { notFound } from "next/navigation";
import { fetchFromSanity } from "@/lib/sanity/client";
import { schoolUpdateBySlugQuery } from "@/lib/sanity/queries";

type SchoolUpdateDetail = {
  title: string;
  slug: string;
  publishedAt: string;
  kind: "News" | "Activity";
  category: string;
  excerpt: string;
  coverImageUrl: string;
  coverImageAlt: string;
  body?: unknown[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

type PortableTextImageValue = {
  asset?: unknown;
  alt?: string;
  caption?: string;
};

function sanitizeSlug(slug: string) {
  return slug.replace(/[^a-zA-Z0-9-_]/g, "");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const builder =
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null;

function urlForImage(source: unknown) {
  if (!builder || !source) return null;
  return builder.image(source).width(1400).fit("max").auto("format").url();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const safeSlug = sanitizeSlug(slug);
  const update = await fetchFromSanity<SchoolUpdateDetail>(
    schoolUpdateBySlugQuery(safeSlug),
    ["schoolUpdateItem"],
  );

  if (!update) {
    return {
      title: "Update Not Found – Devarshi Vidhyalaya",
    };
  }

  return {
    title: `${update.title} – Devarshi Vidhyalaya`,
    description: update.excerpt,
  };
}

export default async function SchoolUpdateDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const safeSlug = sanitizeSlug(slug);
  const update = await fetchFromSanity<SchoolUpdateDetail>(
    schoolUpdateBySlugQuery(safeSlug),
    ["schoolUpdateItem"],
  );

  if (!update) notFound();

  const publishedDate = new Date(update.publishedAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[oklch(0.36_0.13_25)] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <Newspaper className="w-7 h-7 text-[oklch(0.76_0.13_80)]" />
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">
              School Update
            </p>
          </div>
          <h1 className="font-serif font-black text-3xl lg:text-4xl text-balance max-w-4xl">
            {update.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[oklch(0.76_0.13_80)]/30 text-white">
              {update.kind}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/15 text-white">
              {update.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
              <CalendarDays className="w-4 h-4" />
              {publishedDate}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted mb-8">
          <Image
            src={update.coverImageUrl}
            alt={update.coverImageAlt || update.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        <article className="bg-card border border-border rounded-2xl p-6 lg:p-8">
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            {update.excerpt}
          </p>
          <div className="text-[oklch(0.20_0.02_30)] leading-relaxed">
            {update.body && update.body.length > 0 ? (
              <PortableText
                value={
                  update.body as Array<{
                    _type: string;
                    [key: string]: unknown;
                  }>
                }
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-base leading-relaxed text-[oklch(0.20_0.02_30)] mb-4">
                        {children}
                      </p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="font-serif font-black text-3xl lg:text-4xl text-[oklch(0.20_0.02_30)] mt-10 mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)] mt-8 mb-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-serif font-bold text-xl text-[oklch(0.20_0.02_30)] mt-6 mb-2">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="font-serif font-semibold text-lg text-[oklch(0.20_0.02_30)] mt-5 mb-2">
                        {children}
                      </h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="font-serif font-semibold text-base text-[oklch(0.20_0.02_30)] mt-4 mb-2">
                        {children}
                      </h5>
                    ),
                    h6: ({ children }) => (
                      <h6 className="font-serif font-semibold text-sm uppercase tracking-wide text-[oklch(0.30_0.04_240)] mt-4 mb-2">
                        {children}
                      </h6>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-[oklch(0.76_0.13_80)] pl-4 italic text-muted-foreground my-5">
                        {children}
                      </blockquote>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-4 space-y-2">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => <li>{children}</li>,
                    number: ({ children }) => <li>{children}</li>,
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    link: ({ children, value }) => {
                      const href = (value?.href as string) || "#";
                      const isExternal =
                        href.startsWith("http://") ||
                        href.startsWith("https://");
                      return (
                        <a
                          href={href}
                          className="text-[oklch(0.36_0.13_25)] underline underline-offset-2 hover:text-[oklch(0.26_0.11_25)]"
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                          {children}
                        </a>
                      );
                    },
                  },
                  types: {
                    image: ({ value }) => {
                      const imageValue = value as PortableTextImageValue;
                      const src = urlForImage(imageValue);
                      if (!src) return null;
                      return (
                        <figure className="my-8">
                          <img
                            src={src}
                            alt={imageValue.alt || ""}
                            className="w-full rounded-xl border border-border object-cover"
                            loading="lazy"
                          />
                          {imageValue.caption ? (
                            <figcaption className="mt-2 text-xs text-muted-foreground">
                              {imageValue.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      );
                    },
                  },
                }}
              />
            ) : (
              <p>
                More details for this update will be published soon. Please
                check back for complete information and photos.
              </p>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
