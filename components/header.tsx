"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Academy", href: "#academy" },
  { label: "Management", href: "#management" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Admission", href: "#admission" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[oklch(0.36_0.13_25)] shadow-md shadow-[oklch(0.36_0.13_25)]/20 border-b border-[oklch(0.76_0.13_80)]/30"
          : "bg-[oklch(0.97_0.015_85)]/85 backdrop-blur-sm border-b border-[oklch(0.36_0.13_25)]/10",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Devarshi Vidhyalaya Home"
          >
            <div
              className={cn(
                "relative w-11 h-11 lg:w-14 lg:h-14 rounded-md overflow-hidden ring-1 shadow-sm group-hover:scale-105 transition-all",
                scrolled
                  ? "bg-white/15 ring-[oklch(0.76_0.13_80)]/40"
                  : "bg-[oklch(0.36_0.13_25)]/5 ring-[oklch(0.36_0.13_25)]/20",
              )}
            >
              <Image
                src="/images/devarshi-logo.png"
                alt="Devarshi Vidhyalaya logo"
                fill
                className="object-cover"
                sizes="56px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-serif font-bold text-base lg:text-lg leading-tight transition-colors",
                  scrolled ? "text-white" : "text-[oklch(0.20_0.02_30)]",
                )}
              >
                Devarshi Vidhyalaya
              </span>
              <span
                className={cn(
                  "text-xs font-sans tracking-[0.18em] uppercase transition-colors",
                  scrolled
                    ? "text-[oklch(0.76_0.13_80)]"
                    : "text-[oklch(0.36_0.13_25)]",
                )}
              >
                Knowledge · Character · Vision
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  scrolled
                    ? "text-white/90 hover:text-[oklch(0.76_0.13_80)] hover:bg-white/10"
                    : "text-[oklch(0.20_0.02_30)] hover:text-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.36_0.13_25)]/8",
                )}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#admission")}
              className={cn(
                "ml-3 px-5 py-2 font-semibold text-sm rounded-md transition-colors shadow-sm",
                scrolled
                  ? "bg-[oklch(0.76_0.13_80)] hover:bg-[oklch(0.62_0.13_78)] text-[oklch(0.20_0.02_30)]"
                  : "bg-[oklch(0.36_0.13_25)] hover:bg-[oklch(0.26_0.11_25)] text-white",
              )}
            >
              Apply Now
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              scrolled
                ? "text-white hover:bg-white/10"
                : "text-[oklch(0.20_0.02_30)] hover:bg-[oklch(0.36_0.13_25)]/8",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {open && (
        <nav
          className="lg:hidden bg-[oklch(0.26_0.11_25)] border-t border-[oklch(0.76_0.13_80)]/30 py-4 px-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-white/90 hover:text-[oklch(0.76_0.13_80)] hover:bg-white/10 rounded-md transition-colors font-medium"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="mt-2">
              <button
                onClick={() => handleNavClick("#admission")}
                className="w-full px-4 py-3 bg-[oklch(0.76_0.13_80)] hover:bg-[oklch(0.62_0.13_78)] text-[oklch(0.20_0.02_30)] font-bold rounded-md transition-colors"
              >
                Apply Now
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
