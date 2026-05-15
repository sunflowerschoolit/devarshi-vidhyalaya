"use client";

import { useState } from "react";
import {
  Baby,
  BookText,
  BookOpenCheck,
  Languages,
  FileCheck,
  Calculator,
  School,
  Cctv,
  LayoutGrid,
  ClipboardList,
  Map,
  HeartHandshake,
  Theater,
  Shield,
  UserCheck,
  Leaf,
  Award,
  Van,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["Curriculum", "Facilities", "Unique Features"] as const;
type Tab = (typeof tabs)[number];

const curriculumItems = [
  {
    icon: Baby,
    title: "Pre-Primary (Nursery to Sr. KG)",
    desc: "Activity-based learning with focus on basic skills, creativity, and confidence building.",
  },
  {
    icon: BookText,
    title: "Primary (Std. 1 to 5)",
    desc: "Strong foundation in reading, writing, mathematics, and environmental studies with regular assessments.",
  },
  {
    icon: BookOpenCheck,
    title: "Upper Primary (Std. 6 to 8)",
    desc: "Concept-based learning with focus on academics, discipline, and exam preparation.",
  },
  {
    icon: Languages,
    title: "Gujarati & English Medium",
    desc: "Students can learn in both Gujarati and English medium as per their comfort.",
  },
  {
    icon: FileCheck,
    title: "Exam Preparation Support",
    desc: "Special guidance for Jawahar Navodaya, PSE, CET and other competitive exams.",
  },
  {
    icon: Calculator,
    title: "Vedic Maths & Skill Learning",
    desc: "Improving calculation speed and logical thinking through Vedic Maths.",
  },
];

const facilitiesItems = [
  {
    icon: School,
    title: "Spacious & Comfortable Classrooms",
    desc: "Well-ventilated classrooms with a comfortable learning environment.",
  },
  {
    icon: Cctv,
    title: "CCTV Security",
    desc: "Campus under CCTV surveillance for student safety.",
  },
  {
    icon: Van,
    title: "Van Transport Facility Available",
    desc: "Safe and reliable school van transport is available on selected routes with supervised pick-up and drop-off.",
  },
  {
    icon: LayoutGrid,
    title: "Activity Space",
    desc: "Open space for yoga, prayer, and student activities.",
  },
  {
    icon: ClipboardList,
    title: "Regular Tests & Evaluation",
    desc: "Weekly and monthly tests to track student progress.",
  },
  {
    icon: Map,
    title: "Learning Through Activities",
    desc: "Picnics, field visits, and practical learning experiences.",
  },
];

const featuresItems = [
  {
    icon: HeartHandshake,
    title: "Value-Based Education",
    desc: "Prayer, Bhagavad Gita knowledge, and moral learning.",
  },
  {
    icon: Theater,
    title: "Cultural Activities",
    desc: "Dance, drama, festivals, and traditional celebrations.",
  },
  {
    icon: Shield,
    title: "Self-Defense Training",
    desc: "Basic training to build confidence and safety awareness.",
  },
  {
    icon: UserCheck,
    title: "Smart Student Development",
    desc: "Special focus on confidence, discipline, and personality.",
  },
  {
    icon: Leaf,
    title: "Yoga & Health Activities",
    desc: "Regular yoga sessions for physical and mental well-being.",
  },
  {
    icon: Award,
    title: "Student Recognition",
    desc: "Rewards and encouragement to motivate students.",
  },
];

const tabData: Record<Tab, typeof curriculumItems> = {
  Curriculum: curriculumItems,
  Facilities: facilitiesItems,
  "Unique Features": featuresItems,
};

export default function AcademySection() {
  const [activeTab, setActiveTab] = useState<Tab>("Curriculum");
  const items = tabData[activeTab];

  return (
    <section id="academy" className="py-24 lg:py-32 bg-[oklch(0.94_0.02_80)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-[oklch(0.76_0.13_80)]/25 text-[oklch(0.36_0.13_25)] text-[11px] font-bold uppercase tracking-[0.22em] rounded-sm mb-5">
            Academy
          </span>
          <h2 className="font-serif font-black text-[oklch(0.20_0.02_30)] text-3xl lg:text-4xl xl:text-5xl text-balance mb-4">
            Education That Shapes Mind, Heart, and Habit
          </h2>
          <div className="w-20 h-0.5 bg-[oklch(0.36_0.13_25)] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-muted-foreground text-base lg:text-lg leading-relaxed text-pretty">
            Our curriculum blends academics, creative activities, and cultural
            learning so every child grows with knowledge, confidence, and
            strong values.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex bg-white border border-border rounded-md p-1 shadow-sm"
            role="tablist"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2.5 text-sm font-semibold rounded-md transition-all duration-200",
                  activeTab === tab
                    ? "bg-[oklch(0.36_0.13_25)] text-white shadow-sm"
                    : "text-muted-foreground hover:text-[oklch(0.36_0.13_25)]",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid: horizontal, 2-col on lg */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-card border border-border rounded-md p-6 lg:p-7 transition-all duration-300 flex items-start gap-5 hover:shadow-md hover:border-[oklch(0.76_0.13_80)]/50 overflow-hidden"
              >
                {/* Gold left accent on hover */}
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-[oklch(0.76_0.13_80)] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                <div className="shrink-0 w-12 h-12 rounded-md bg-[oklch(0.36_0.13_25)]/8 group-hover:bg-[oklch(0.36_0.13_25)] flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-[oklch(0.36_0.13_25)] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-base lg:text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
