"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Rituals", href: "#rituals" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "Visit", href: "#visit" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/95 backdrop-blur-sm border-b border-line shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">

          {/* Wordmark */}
          <a
            href="#"
            className={`font-serif text-lg italic transition-colors duration-300 ${
              scrolled ? "text-ink" : "text-white"
            }`}
            aria-label="Wellness with Skyla — back to top"
          >
            Wellness with Skyla
          </a>

          {/* Right side: Book CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#book"
              className={`hidden sm:inline-flex font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 px-5 py-2.5 rounded-full ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary-deep"
                  : "bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-sm"
              }`}
            >
              Book a Session
            </a>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`flex flex-col gap-[5px] p-2 transition-colors duration-300 ${
                scrolled ? "text-ink" : "text-white"
              }`}
            >
              {menuOpen ? (
                <X size={22} />
              ) : (
                <>
                  <span className={`block h-[1.5px] w-6 rounded-full transition-all ${scrolled ? "bg-ink" : "bg-white"}`} />
                  <span className={`block h-[1.5px] w-4 rounded-full transition-all ${scrolled ? "bg-ink" : "bg-white"}`} />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen nav overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bg transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center h-full px-10 lg:px-20 gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-4 py-4 border-b border-line transition-all duration-300 hover:pl-2"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              <span className="font-sans text-xs text-ink-soft/40 tabular-nums">0{i + 1}</span>
              <span className="font-serif text-4xl italic text-ink group-hover:text-primary transition-colors sm:text-5xl lg:text-6xl">
                {link.label}
              </span>
            </a>
          ))}

          <a
            href="#book"
            onClick={() => setMenuOpen(false)}
            className="mt-8 self-start inline-flex items-center gap-2 bg-primary text-white font-sans text-xs font-semibold uppercase tracking-[0.12em] px-6 py-3 rounded-full hover:bg-primary-deep transition-colors"
          >
            Book a Session →
          </a>
        </div>
      </div>
    </>
  );
}
