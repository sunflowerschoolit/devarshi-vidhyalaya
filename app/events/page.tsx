import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { fetchFromSanity } from "@/lib/sanity/client";
import { allUpcomingEventsQuery } from "@/lib/sanity/queries";
import type { EventItem } from "@/lib/sanity/types";
import EventsListWithPopup, {
  type EventListItem,
} from "@/components/events-list-with-popup";

export const metadata: Metadata = {
  title: "Upcoming Events – Devarshi Vidhyalaya",
  description:
    "Explore all upcoming school events including academic, cultural, sports, and admission activities.",
};

function formatEventDateParts(dateValue: string) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return { day: "", month: "" };
  return {
    day: String(date.getDate()),
    month: date.toLocaleString("en-US", { month: "short" }),
  };
}

function formatEventDateLabel(startDate: string, endDate?: string) {
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return "";
  const startText = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (!endDate) return startText;
  const end = new Date(endDate);
  if (Number.isNaN(end.getTime())) return startText;
  const endText = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (startText === endText) return startText;
  return `${startText} - ${endText}`;
}

function formatEventTime(startTime?: string, endTime?: string) {
  if (startTime && endTime) return `${startTime} - ${endTime}`;
  if (startTime) return startTime;
  return "All Day";
}

export default async function EventsPage() {
  const cmsEvents = await fetchFromSanity<EventItem[]>(
    allUpcomingEventsQuery,
    ["eventItem"],
  );

  const events: EventListItem[] =
    cmsEvents?.map((event) => ({
      date: formatEventDateParts(event.startDate),
      dateLabel: formatEventDateLabel(event.startDate, event.endDate),
      title: event.title,
      time: formatEventTime(event.startTime, event.endTime),
      venue: event.venue,
      type: event.type,
      summary: event.summary,
    })) ?? [];

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
            <Calendar className="w-8 h-8 text-[oklch(0.76_0.13_80)]" />
            <h1 className="font-serif font-black text-3xl lg:text-4xl">
              Upcoming Events
            </h1>
          </div>
          <p className="text-white/75 text-sm">
            Discover all upcoming activities and key dates at Devarshi Public
            School.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {events.length > 0 ? (
          <EventsListWithPopup events={events} />
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <p className="text-muted-foreground">No upcoming events available.</p>
          </div>
        )}
      </main>
    </div>
  );
}
