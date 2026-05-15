import { Target, Eye, Heart } from "lucide-react";
import SchoolAchievementsSection from "./achievement-banner-section";

const ESTABLISHED_YEAR = 2016;
const ESTABLISHED_MONTH_INDEX = 5; // June (0-based month index)

const now = new Date();
const hasCompletedAnniversaryThisYear =
  now.getMonth() > ESTABLISHED_MONTH_INDEX ||
  (now.getMonth() === ESTABLISHED_MONTH_INDEX && now.getDate() >= 1);

const yearsOfExcellence = Math.max(
  0,
  now.getFullYear() -
    ESTABLISHED_YEAR -
    (hasCompletedAnniversaryThisYear ? 0 : 1),
);

const stats = [
  { value: `${yearsOfExcellence}+`, label: "Years of Excellence" },
  { value: "300+", label: "Students Enrolled" },
  { value: "10+", label: "Qualified Faculty" },
  { value: "15+", label: "Co-Curricular Activities" },
];

const values = [
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To raise confident, kind, and curious learners ready to shape a brighter tomorrow.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To create a joyful, secure space where children explore ideas, develop skills, and embrace cultural values through every stage of learning.",
  },
  {
    icon: Heart,
    title: "Core Values",
    description:
      "Honesty, curiosity, respect, cultural pride, and confidence shape everything we do.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[oklch(0.76_0.13_80)]/25 text-[oklch(0.36_0.13_25)] text-[11px] font-bold uppercase tracking-[0.22em] rounded-sm mb-5">
            About Us
          </span>
          <h2 className="font-serif font-black text-[oklch(0.20_0.02_30)] text-3xl lg:text-4xl xl:text-5xl text-balance mb-4">
            Empowering Children to Learn, Grow, and Thrive
          </h2>
          <div className="w-20 h-0.5 bg-[oklch(0.36_0.13_25)] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-muted-foreground text-base lg:text-lg leading-relaxed text-pretty">
            At Devarshi Vidhyalaya, every child is encouraged to learn with
            curiosity, grow with values, and thrive in a caring space built on
            knowledge, character, and vision.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-md bg-[oklch(0.94_0.02_80)] border-l-2 border-[oklch(0.76_0.13_80)]"
            >
              <p className="font-serif font-black text-[oklch(0.36_0.13_25)] text-3xl lg:text-4xl mb-1">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Vision / Mission / Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative p-8 rounded-md bg-card border border-border hover:border-[oklch(0.76_0.13_80)]/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-md bg-[oklch(0.36_0.13_25)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
                {/* Gold accent bar */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-[oklch(0.76_0.13_80)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            );
          })}
        </div>

        {/* Achievements strip */}
        <SchoolAchievementsSection />
      </div>
    </section>
  );
}
