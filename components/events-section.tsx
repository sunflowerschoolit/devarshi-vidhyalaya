"use client";

import { Calendar, Clock, ArrowRight, Newspaper, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SchoolUpdateItem = {
  slug: string;
  hasDetails: boolean;
  date: string;
  kind: "News" | "Activity";
  category: string;
  title: string;
  excerpt: string;
  image: string;
};

type EventItem = {
  date: {
    day: string;
    month: string;
  };
  dateLabel: string;
  title: string;
  time: string;
  venue?: string;
  type: string;
  summary?: string;
};

const categoryColors: Record<string, string> = {
  Academic: "bg-[oklch(0.92_0.04_25)] text-[oklch(0.36_0.13_25)]",
  Sports: "bg-green-100 text-green-700",
  Culture: "bg-purple-100 text-purple-700",
  Admission: "bg-[oklch(0.76_0.13_80)]/30 text-[oklch(0.26_0.11_25)]",
  Camp: "bg-orange-100 text-orange-700",
  General: "bg-slate-100 text-slate-700",
};

const kindColors: Record<SchoolUpdateItem["kind"], string> = {
  News: "bg-[oklch(0.92_0.04_25)] text-[oklch(0.36_0.13_25)]",
  Activity: "bg-[oklch(0.76_0.13_80)]/30 text-[oklch(0.26_0.11_25)]",
};

type EventsSectionProps = {
  schoolUpdateItems?: SchoolUpdateItem[];
  eventItems?: EventItem[];
  hasMoreUpdates?: boolean;
  hasMoreEvents?: boolean;
};

export default function EventsSection({
  schoolUpdateItems,
  eventItems,
  hasMoreUpdates = false,
  hasMoreEvents = false,
}: EventsSectionProps) {
  const schoolUpdates = schoolUpdateItems ?? [];
  const events = eventItems ?? [];
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  if (schoolUpdates.length === 0 && events.length === 0) return null;

  const hasUpdates = schoolUpdates.length > 0;
  const hasEvents = events.length > 0;

  return (
    <section id="events" className="py-20 lg:py-28 bg-[oklch(0.94_0.02_80)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[oklch(0.76_0.13_80)]/30 text-[oklch(0.26_0.11_25)] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            School Updates & Events
          </span>
          <h2 className="font-serif font-black text-[oklch(0.20_0.02_30)] text-3xl lg:text-4xl xl:text-5xl text-balance mb-4">
            Always Something Exciting Happening
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base lg:text-lg leading-relaxed">
            Stay updated with recent school highlights and upcoming events.
          </p>
        </div>

        <div
          className={`grid gap-8 ${hasUpdates && hasEvents ? "lg:grid-cols-5" : "lg:grid-cols-1"}`}
        >
          {/* School Updates Cards */}
          {hasUpdates ? (
            <div
              className={
                hasEvents
                  ? "lg:col-span-3 space-y-6"
                  : "space-y-6 max-w-4xl mx-auto w-full"
              }
            >
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5 text-[oklch(0.36_0.13_25)]" />
                <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-xl">
                  School Updates
                </h3>
              </div>
              {schoolUpdates.map((item) => (
                <article
                  key={`${item.kind}-${item.title}`}
                  className="group flex gap-5 bg-card border border-border rounded-2xl p-5 hover:border-[oklch(0.36_0.13_25)]/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${kindColors[item.kind]}`}
                        >
                          {item.kind}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${categoryColors[item.category] || categoryColors.General}`}
                        >
                          {item.category}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {item.date}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-sm leading-tight mb-2">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                    {item.hasDetails ? (
                      <Link
                        href={`/updates/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[oklch(0.36_0.13_25)] text-xs font-semibold mt-3 group-hover:gap-2 transition-all"
                      >
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
              {hasMoreUpdates ? (
                <div className="pt-2">
                  <Link
                    href="/updates"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[oklch(0.36_0.13_25)] text-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.36_0.13_25)] hover:text-white text-sm font-semibold transition-colors"
                  >
                    View More Updates <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Upcoming Events */}
          {hasEvents ? (
            <div
              className={
                hasUpdates ? "lg:col-span-2" : "max-w-3xl mx-auto w-full"
              }
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[oklch(0.36_0.13_25)]" />
                <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-xl">
                  Upcoming Events
                </h3>
              </div>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.title}
                    className="group flex gap-4 bg-card border border-border rounded-2xl p-4 hover:border-[oklch(0.36_0.13_25)]/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="shrink-0 w-12 h-12 bg-[oklch(0.36_0.13_25)] rounded-xl flex flex-col items-center justify-center text-white">
                      <span className="text-xs font-bold leading-none">
                        {event.date.month}
                      </span>
                      <span className="text-lg font-black leading-none">
                        {event.date.day}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${categoryColors[event.type] || categoryColors.General}`}
                      >
                        {event.type}
                      </span>
                      <h4 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-sm leading-snug mb-1.5">
                        {event.title}
                      </h4>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>{event.dateLabel}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        {event.venue ? (
                          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{event.venue}</span>
                          </div>
                        ) : null}
                      </div>
                      {event.summary ? (
                        <button
                          type="button"
                          onClick={() => setSelectedEvent(event)}
                          className="inline-flex items-center gap-1 text-[oklch(0.36_0.13_25)] text-xs font-semibold mt-3 hover:gap-2 transition-all"
                        >
                          Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              {hasMoreEvents ? (
                <div className="pt-4">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[oklch(0.36_0.13_25)] text-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.36_0.13_25)] hover:text-white text-sm font-semibold transition-colors"
                  >
                    View More Events <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {selectedEvent ? (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span
                  className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${categoryColors[selectedEvent.type] || categoryColors.General}`}
                >
                  {selectedEvent.type}
                </span>
                <h4 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-xl leading-snug">
                  {selectedEvent.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-sm font-semibold text-muted-foreground hover:text-[oklch(0.20_0.02_30)]"
              >
                Close
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-4">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {selectedEvent.dateLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {selectedEvent.time}
              </span>
              {selectedEvent.venue ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {selectedEvent.venue}
                </span>
              ) : null}
            </div>
            <p className="text-[oklch(0.20_0.02_30)] text-sm leading-relaxed">
              {selectedEvent.summary}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
