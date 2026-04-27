import { Instagram } from "lucide-react";
import { INSTAGRAM_HANDLE, EMAIL } from "@/lib/contact";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-warm py-12" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Wordmark */}
          <a
            href="#top"
            className="font-serif text-2xl italic text-ink transition-opacity hover:opacity-70"
            aria-label="Wellness with Skyla — back to top"
          >
            Wellness with Skyla
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {INSTAGRAM_HANDLE ? (
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Wellness with Skyla on Instagram (@${INSTAGRAM_HANDLE})`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 hover:border-primary hover:text-primary"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
            ) : (
              // TODO: Add Instagram handle to lib/contact.ts
              <span className="font-sans text-xs text-ink-soft/40">
                Social links coming soon
              </span>
            )}
            {/* Other socials commented out — uncomment when relevant:
            <a href="https://facebook.com/..." ...><Facebook ... /></a>
            <a href="https://tiktok.com/@..." ...><...TikTok icon... /></a>
            */}
          </div>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="font-sans text-sm text-ink-soft transition-colors hover:text-primary"
          >
            {EMAIL}
          </a>

          {/* Divider */}
          <div className="h-px w-16 bg-line" aria-hidden="true" />

          {/* Legal + crafted line */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="font-sans text-xs text-ink-soft/60">
              © {year} Wellness with Skyla. All rights reserved.
            </p>
            <p className="font-sans text-xs text-ink-soft/40 italic">
              Crafted with care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
