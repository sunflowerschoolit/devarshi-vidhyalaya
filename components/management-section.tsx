import Image from "next/image";
import { Mail, Linkedin } from "lucide-react";

type LeadershipPerson = {
  name: string;
  role: string;
  image: string;
  bio: string;
  featured?: boolean;
  email?: string;
  linkedinUrl?: string;
};

type TeacherPerson = {
  name: string;
  role: string;
  image: string;
  specialisation: string;
};

type ManagementSectionProps = {
  leadership?: LeadershipPerson[];
  teachers?: TeacherPerson[];
};

export default function ManagementSection({
  leadership,
  teachers,
}: ManagementSectionProps) {
  const leadershipData = leadership ?? [];
  const teacherData = teachers ?? [];

  if (leadershipData.length === 0) return null;

  return (
    <section id="management" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[oklch(0.92_0.04_25)] text-[oklch(0.36_0.13_25)] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Management Team
          </span>
          <h2 className="font-serif font-black text-[oklch(0.20_0.02_30)] text-3xl lg:text-4xl xl:text-5xl text-balance mb-4">
            Guided by Caring Educators
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base lg:text-lg leading-relaxed text-pretty">
            With experience and dedication, our team ensures a positive and
            supportive environment for all students.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="flex flex-wrap justify-center gap-8 lg:flex-row flex-col items-center">
          {leadershipData.map((person) => (
            <div
              key={person.name}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[oklch(0.36_0.13_25)]/10 transition-all duration-300 w-full lg:w-[calc(50%-1rem)] max-w-140"
            >
              {/* Top colour band */}
              <div className="h-2 bg-[oklch(0.36_0.13_25)]" />
              <div className="p-8 flex flex-col sm:flex-row gap-6">
                <div className="shrink-0">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-[oklch(0.76_0.13_80)]">
                    <Image
                      src={person.image}
                      alt={`Portrait of ${person.name}, ${person.role}`}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.36_0.13_25)] mb-1">
                    {person.role}
                  </span>
                  <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-xl mb-3">
                    {person.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {person.bio}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <a
                      href={`mailto:${person.email || "devarshividhyalaya@gmail.com"}`}
                      aria-label={`Email ${person.name}`}
                      className="p-2 rounded-lg bg-[oklch(0.92_0.04_25)] hover:bg-[oklch(0.36_0.13_25)] hover:text-white text-[oklch(0.36_0.13_25)] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={person.linkedinUrl || "#"}
                      aria-label={`${person.name} on LinkedIn`}
                      className="p-2 rounded-lg bg-[oklch(0.92_0.04_25)] hover:bg-[oklch(0.36_0.13_25)] hover:text-white text-[oklch(0.36_0.13_25)] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teaching Staff */}
        {teacherData.length > 0 ? (
          <div>
            <h3 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-2xl text-center mb-8">
              Our Teachers
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,260px))] justify-center gap-6">
              {teacherData.map((teacher) => (
                <div
                  key={teacher.name}
                  className="group text-center bg-card border border-border rounded-2xl p-6 hover:border-[oklch(0.76_0.13_80)] hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-[oklch(0.88_0.03_70)] group-hover:ring-[oklch(0.76_0.13_80)] mx-auto mb-4 transition-all">
                    <Image
                      src={teacher.image}
                      alt={`Portrait of ${teacher.name}, ${teacher.role}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <h4 className="font-serif font-bold text-[oklch(0.20_0.02_30)] text-sm mb-1">
                    {teacher.name}
                  </h4>
                  <p className="text-[oklch(0.36_0.13_25)] text-xs font-semibold mb-1">
                    {teacher.role}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {teacher.specialisation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
