import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – Devarshi Vidhyalaya",
  description:
    "Read the Privacy Policy for Devarshi Vidhyalaya website, including what information is collected and how it is used.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[oklch(0.36_0.13_25)] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-8 h-8 text-[oklch(0.76_0.13_80)]" />
            <h1 className="font-serif font-black text-3xl lg:text-4xl">
              Privacy Policy
            </h1>
          </div>
          <p className="text-white/75 text-sm">Last updated: April 18, 2026</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              1. Introduction
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Devarshi Vidhyalaya respects your privacy and is committed to
              protecting personal information shared through this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              2. Information We Collect
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We may collect personal details that you voluntarily provide in
              inquiry forms, including name, phone number, email address,
              academic details, and message content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              3. How We Use Information
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Information collected is used only for school communication,
              admission and career inquiry responses, and internal administrative
              follow-up.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              4. Data Sharing
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The school does not sell or rent your personal information. Data
              may be shared only with authorized staff or service providers
              required to process communications and maintain website operations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              5. Data Security
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Reasonable technical and administrative safeguards are in place to
              protect submitted information. However, no internet transmission is
              fully secure, and absolute security cannot be guaranteed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              6. Cookies and Analytics
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This website may use essential cookies and limited analytics tools
              to improve website performance and user experience. You may manage
              cookies via your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              7. Third-Party Links
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our website may contain links to external websites. We are not
              responsible for the privacy practices or content of third-party
              websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Information about students is generally submitted by
              parents/guardians for admission or school-related communication.
              The school processes such data only for legitimate educational and
              administrative purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              9. Policy Updates
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This Privacy Policy may be updated from time to time. Changes will
              be posted on this page with an updated effective date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              10. Contact Us
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For privacy-related questions, please contact Devarshi Public
              School at{" "}
              <a
                href="mailto:info@devarshividhyalaya.com"
                className="text-[oklch(0.36_0.13_25)] hover:underline"
              >
                info@devarshividhyalaya.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
