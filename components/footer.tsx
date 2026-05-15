"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  ArrowUp,
  Navigation,
} from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Academy", href: "#academy" },
  { label: "Management", href: "#management" },
  { label: "Events & News", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Admission", href: "#admission" },
];

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/devarshividhyalaya",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/devarshividhyalaya",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@devarshividhyalaya",
  },
];

const handleNavClick = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.20_0.02_30)] text-white" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-white/10 ring-1 ring-[oklch(0.76_0.13_80)]/30">
                <Image
                  src="/images/devarshi-logo.png"
                  alt="Devarshi Vidhyalaya logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="font-serif font-bold text-sm leading-tight">
                  Devarshi Vidhyalaya
                </p>
                <p className="text-white/50 text-xs">
                  Knowledge · Character · Vision
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A place where curiosity grows, values are nurtured, and every
              child is prepared for a bright future.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-white/10 hover:bg-[oklch(0.76_0.13_80)] hover:text-[oklch(0.20_0.02_30)] text-white/70 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[oklch(0.76_0.13_80)] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/60 hover:text-[oklch(0.76_0.13_80)] text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/gallery"
                  className="text-white/60 hover:text-[oklch(0.76_0.13_80)] text-sm transition-colors"
                >
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[oklch(0.76_0.13_80)] mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+917574906163"
                  className="flex items-start gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 mt-0.5 text-[oklch(0.76_0.13_80)]" />
                  <div className="text-sm">
                    <p>+91 75749 06163</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@devarshividhyalaya.com"
                  className="flex items-start gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 mt-0.5 text-[oklch(0.76_0.13_80)]" />
                  <span className="text-sm break-all">
                    info@devarshividhyalaya.com
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[oklch(0.76_0.13_80)]" />
                <div className="text-sm">
                  <p>
                    Devarshi Vidhyalaya,
                    <br />
                    Vikramnagar Society - 1, Punagam Road,
                    <br />
                    Surat - 395010
                  </p>
                  <a
                    href="https://maps.app.goo.gl/HfGNt7AY8JqLtN91A"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get directions to Devarshi Vidhyalaya on Google Maps"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[oklch(0.76_0.13_80)] hover:text-white underline underline-offset-4 decoration-[oklch(0.76_0.13_80)]/60 hover:decoration-white transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Open in Maps
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-1 text-white/50 text-xs">
              <p>Mon – Sat: 7:00 AM – 7:00 PM</p>
              <p>Sunday & Public Holidays: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gold rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.76_0.13_80)]/60 to-transparent" />

      {/* Bottom bar */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-white/40 text-xs text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} Devarshi Vidhyalaya. All rights
              reserved.
            </p>
            <span className="hidden sm:inline text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5">
              Developed by
              <a
                href="https://wa.me/917698801928"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with bhavesh-dev on WhatsApp"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] hover:text-white font-semibold border border-[#25D366]/40 hover:border-[#25D366] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                bhavesh-dev
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-white/40 text-xs">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 hover:text-[oklch(0.76_0.13_80)] transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
