import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use – Devarshi Vidhyalaya",
  description:
    "Read the Terms of Use governing access to and use of the Devarshi Vidhyalaya website.",
};

export default function TermsOfUsePage() {
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
            <FileText className="w-8 h-8 text-[oklch(0.76_0.13_80)]" />
            <h1 className="font-serif font-black text-3xl lg:text-4xl">
              Terms of Use
            </h1>
          </div>
          <p className="text-white/75 text-sm">Last updated: April 18, 2026</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              By accessing or using this website, you agree to be bound by
              these Terms of Use and all applicable laws. If you do not agree
              with these terms, please do not use this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              2. Purpose of Website
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This website is provided by Devarshi Vidhyalaya for general
              informational purposes, including school updates, events, gallery
              content, and admission or career inquiry facilitation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              3. User Responsibilities
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You agree to provide accurate and complete information while
              submitting any form and to not use the website for any unlawful,
              abusive, fraudulent, or harmful activity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              4. Admissions and Employment Information
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Submission of admission or career inquiry forms does not create a
              right to admission or employment. All decisions are made solely by
              the school based on internal policies, eligibility criteria, and
              seat or vacancy availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              5. Intellectual Property
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All content on this website, including text, images, branding,
              design elements, and media, is owned by or licensed to Devarshi
              Public School unless otherwise stated. Unauthorized reproduction,
              distribution, or commercial use is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              6. Third-Party Links
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This website may include links to third-party platforms, including
              social media and map services. The school does not control and is
              not responsible for the content, policies, or practices of those
              third-party websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              7. Disclaimer
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              While reasonable efforts are made to keep information accurate and
              updated, content on this website is provided on an “as is” and
              “as available” basis without warranties of any kind, express or
              implied.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              8. Limitation of Liability
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Devarshi Vidhyalaya shall not be liable for any direct,
              indirect, incidental, consequential, or special damages arising
              out of or related to your use of, or inability to use, this
              website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              9. Changes to Terms
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The school may revise these Terms of Use at any time without prior
              notice. Continued use of the website after updates constitutes
              acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              10. Governing Law
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              These Terms of Use are governed by the laws of India. Any disputes
              arising from or related to these terms shall be subject to the
              jurisdiction of the competent courts in Surat, Gujarat.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-2xl text-[oklch(0.20_0.02_30)]">
              11. Contact
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For any questions regarding these Terms of Use, please contact
              Devarshi Vidhyalaya at{" "}
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
