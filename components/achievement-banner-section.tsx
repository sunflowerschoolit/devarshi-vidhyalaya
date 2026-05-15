import { GraduationCap, ShieldCheck, BookOpen, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Competitive Exam Success",
    description: "Students selected in Jawahar Navodaya and other entrance exams",
  },
  {
    icon: ShieldCheck,
    title: "Disciplined Environment",
    description: "Safe, supportive, and value-based campus for every learner",
  },
  {
    icon: BookOpen,
    title: "Strong Academic Foundation",
    description: "Focus on basics, regular tests, and guided preparation",
  },
  {
    icon: Sparkles,
    title: "All-Round Development",
    description: "Studies, values, culture, and student activities together",
  },
];

export default function SchoolAchievementsSection() {
  return (
    <section id="achievement" className="w-full">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-md bg-[oklch(0.36_0.13_25)] text-white shadow-lg border border-[oklch(0.76_0.13_80)]/30">
        <div className="grid gap-8 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[1.2fr_0.95fr] lg:gap-10 lg:px-14 lg:py-14">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-sm bg-[oklch(0.76_0.13_80)]/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[oklch(0.76_0.13_80)]">
              Our Achievements
            </span>

            <h2 className="font-serif max-w-2xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Achievements That Reflect Our Students&apos; Spirit
            </h2>

            <div className="w-16 h-0.5 bg-[oklch(0.76_0.13_80)] mt-6 mb-5" />

            <p className="max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              At Devarshi Vidhyalaya, learners build strong academic roots,
              confident personalities, and lasting values that fuel achievement
              well beyond the classroom.
            </p>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-md border border-white/10 bg-[oklch(0.26_0.11_25)] p-5 shadow-md transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[oklch(0.76_0.13_80)]/15">
                    <Icon className="h-6 w-6 text-[oklch(0.76_0.13_80)]" />
                  </div>

                  <h3 className="font-serif text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
