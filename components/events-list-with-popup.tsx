"use client";

import { useState } from "react";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

export type EventListItem = {
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

type EventsListWithPopupProps = {
  events: EventListItem[];
};

export default function EventsListWithPopup({ events }: EventsListWithPopupProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventListItem | null>(null);

  return (
    <>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={`${event.title}-${event.date.day}-${event.date.month}`}
            className="group flex gap-4 bg-card border border-border rounded-2xl p-4 hover:border-[oklch(0.36_0.13_25)]/40 hover:shadow-md transition-all duration-300"
          >
            <div className="shrink-0 w-12 h-12 bg-[oklch(0.36_0.13_25)] rounded-xl flex flex-col items-center justify-center text-white">
              <span className="text-xs font-bold leading-none">{event.date.month}</span>
              <span className="text-lg font-black leading-none">{event.date.day}</span>
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
    </>
  );
}
