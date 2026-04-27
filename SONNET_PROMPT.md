# Build Prompt: Wellness with Skyla — Massage Therapy Website (v1)

You are a **senior frontend engineer and UI/UX designer**. Your job is to design and ship a production-quality marketing site for an independent massage therapist. This is the v1 build. We will iterate on the visual design afterwards by browsing the live site together — so optimize for clean, easy-to-edit code, not over-engineered abstractions.

---

## 1. Working directory & existing assets

Everything below is relative to the repo root: `/Users/dylangeldenhuys/code/wellness-skyla-website`.

```
.
├── DESIGN.md                       # empty — you may populate as you work
├── WEBSITE_TEMPLATE.html           # design INSPIRATION ONLY (Mystic Om mockup). Do NOT copy markup.
├── websight_details.md             # source of truth for services, prices, packages, discounts
├── images_of_skyla/                # 3 real photos of Skyla — hero/about candidates
│   ├── face_Image_of_skyla.jpeg
│   ├── skyla_giving_masage.jpeg
│   └── skyla_holding_massage_matress_happy.jpeg
└── stock_images/                   # 3 stock spa shots — gallery/section breaks
    ├── im1.jpg
    ├── im2.jpg
    └── im3.jpg
```

**First task:** copy/move all images into `public/images/` (keep `skyla/` and `stock/` subfolders) so Next.js can serve them via `next/image`. Rename `face_Image_of_skyla.jpeg` → `skyla-face.jpg`, etc. Use lowercase, hyphen-separated names.

---

## 2. Stack & tooling (non-negotiable)

- **Framework:** Next.js 15 (App Router, React 19, TypeScript strict mode)
- **Package manager:** npm
- **Styling:** Tailwind CSS v4 (or v3 if v4 setup is friction — decide and document)
- **Fonts:** `next/font/google` — `Noto Serif` (display + body serif) and `Plus Jakarta Sans` (uppercase labels/UI)
- **Icons:** `lucide-react`
- **Image handling:** `next/image` everywhere; no raw `<img>` tags
- **Linting/formatting:** ESLint (next/core-web-vitals + typescript) + Prettier with Tailwind plugin
- **Deploy target:** Vercel (don't deploy — just make sure `npm run build` succeeds cleanly)

Initialize with `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"` and adapt. Do not commit `node_modules`.

---

## 3. Brand identity

The brand name is **Wellness with Skyla** (use this everywhere; tagline TBD — leave a clear `TODO` placeholder in code so Skyla can refine it later).

**Design direction:** warm, grounded, intimate — *not* clinical, *not* generic-luxury-spa. Think hand-thrown clay, late-afternoon sun, linen, terracotta. Take cues from `WEBSITE_TEMPLATE.html` (palette, typography rhythm, arched imagery, generous whitespace) but **do not copy its layout or markup** — design something tailored to Skyla.

**Color tokens** (define these as CSS variables in `globals.css` and as Tailwind theme extensions):

| Token            | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| `--bg`           | `#FFF8F3` | Page background                |
| `--surface`      | `#FFF1EB` | Cards, sections                |
| `--surface-warm` | `#F9E4DC` | Elevated cards                 |
| `--ink`          | `#241914` | Primary text                   |
| `--ink-soft`     | `#574239` | Secondary text                 |
| `--primary`      | `#9C3F00` | CTAs, links                    |
| `--primary-deep` | `#7A3000` | CTA hover                      |
| `--clay`         | `#D06224` | Accents                        |
| `--olive`        | `#8A8635` | Tertiary accent (sparingly)    |
| `--line`         | `#DEC0B4` | Borders, dividers              |

Support a tasteful dark mode if it falls out naturally; otherwise skip it for v1 — don't half-do it.

**Typography scale** — match this:

- Display: Noto Serif, ~4.5rem, line-height 1.1, weight 400, letter-spacing -0.02em
- H1: Noto Serif, ~3rem, line-height 1.2
- H2: Noto Serif, ~2.25rem
- Body: Noto Serif, 1rem / 1.6 (yes, serif body — it's the brand)
- Lead/intro body: Noto Serif, 1.25rem / 1.6
- Label/eyebrow: Plus Jakarta Sans, 0.75rem, weight 600, letter-spacing 0.1em, ALL CAPS

**Motion:** subtle. `transition-all duration-500 ease-out` for hover states. One or two scroll-triggered fade-ups (use CSS `@starting-style` or a tiny IntersectionObserver — don't pull in Framer Motion for v1).

**Imagery treatment:** at least one **arched image** (clip-path or rounded-t-full) using a Skyla photo in the hero. Stock images get warmer treatment via a soft overlay (`bg-gradient-to-t from-bg/60`).

---

## 4. Information architecture (single-page, smooth-scroll)

Sections in order, each with a stable `id` for anchor nav:

1. **`#top` — Sticky header.** Logo wordmark "Wellness with Skyla" (italic serif). Nav: Rituals, Packages, About, Visit. Right-aligned primary CTA "Book a Session" → scrolls to `#book`.
2. **`#hero` — Hero.** Two-column on desktop (image left in arch, copy right), stacked on mobile. Headline like "Begin your descent into stillness." (placeholder — mark as `TODO: copywriting`). Subhead: one sentence about Skyla's craft. Primary CTA + secondary "View rituals" link.
3. **`#rituals` — Individual treatments.** Card grid (2 cols on tablet, 3 on desktop). One card per service (see §5). Each card: eyebrow category, name, duration, price, 1-line description, "Select" affordance.
4. **`#packages` — Bundled experiences.** Distinct visual treatment from §3 — slightly warmer surface, maybe a horizontal layout. Same data shape.
5. **`#about` — Meet Skyla.** Asymmetric layout, one of the personal photos, ~2 paragraphs of placeholder bio (clearly marked `TODO: bio copy`), her training/credentials as a bulleted line, a pull-quote.
6. **`#offers` — First & second visit discounts.** Quiet, elegant strip — not a screaming banner. Two columns: "First visit · 20% off" / "Second visit · 10% off". Small print explaining Therapi prep adds 5 min.
7. **`#gallery` — Atmospheric strip.** Stock images + remaining Skyla photos in a 3-up arrangement with subtle parallax-feel offsets (no actual JS parallax needed — just staggered margins).
8. **`#testimonials` — Placeholder.** 2–3 testimonial cards with `TODO` placeholder text. Build the component so Skyla can drop in real ones later.
9. **`#book` — Booking CTA.** This is the only "interactive" piece. Service selector (radio cards listing all rituals + packages). Two CTAs:
   - **"Book via WhatsApp"** — `https://wa.me/<NUMBER>?text=...` deep link, message prefilled with selected service name + duration + price. Use `<NUMBER>` placeholder constant `WHATSAPP_NUMBER` in a `lib/contact.ts` file.
   - **"Email Skyla"** — `mailto:` fallback, similarly prefilled subject/body.
   Both pull from a single `selectedService` state.
10. **`#visit` — Location & hours.** Address placeholder, hours placeholder, simple Google Maps embed iframe (use a `TODO: real address` comment), phone, email.
11. **Footer.** Brand wordmark, social icon placeholders (Instagram is the only one likely to matter — keep others commented out), copyright, "Crafted with care" line.

---

## 5. Service catalog (source of truth)

Pull this verbatim into a typed `lib/services.ts` module. Currency is **South African Rand (R)**. Times listed are session length.

```ts
export type Service = {
  id: string;
  name: string;
  category: "Face" | "Body" | "Modality" | "Package";
  durationMin: number;
  priceZar: number;
  description: string; // start with TODO placeholders, keep them short
  isPackage: boolean;
};
```

**Individual rituals:**

| id                    | name                       | category | duration | price |
|-----------------------|----------------------------|----------|----------|-------|
| `face-drainage-30`    | Face Drainage Massage      | Face     | 30 min   | R250  |
| `lymphatic-90`        | Lymphatic Drainage Massage | Body     | 90 min   | R680  |
| `aroma-60`            | Aroma Oil Massage          | Body     | 60 min   | R600  |
| `therapi-30`          | Therapi Machine Session    | Modality | 30 min   | R200  |
| `thai-120`            | Thai Massage               | Body     | 120 min  | R750  |

**Packages:**

| id                          | name                                          | duration | price |
|-----------------------------|-----------------------------------------------|----------|-------|
| `pkg-aroma-face-90`         | Aroma Oil + Face Drainage                     | 90 min   | R750  |
| `pkg-lymphatic-face-120`    | Lymphatic + Face Drainage                     | 120 min  | R850  |
| `pkg-aroma-therapi-95`      | Aroma Oil + Therapi                           | 95 min   | R750  |
| `pkg-face-therapi-65`       | Face Massage + Therapi                        | 65 min   | R450  |

**Promotions:**
- First visit: **20% off**
- Second visit: **10% off**
- Therapi-inclusive sessions add ~5 min for setup (already reflected in package durations).

Render prices via a `formatPrice(zar)` helper that outputs `R 750` (space, no decimals).

---

## 6. Component plan

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, root <html>
│   ├── page.tsx            # composes all sections in order
│   └── globals.css         # CSS vars + Tailwind layers
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Rituals.tsx
│   │   ├── Packages.tsx
│   │   ├── About.tsx
│   │   ├── Offers.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Book.tsx
│   │   └── Visit.tsx
│   └── ui/
│       ├── ServiceCard.tsx
│       ├── Eyebrow.tsx
│       ├── ArchImage.tsx
│       └── PrimaryButton.tsx
└── lib/
    ├── services.ts         # typed catalog above
    ├── contact.ts          # WHATSAPP_NUMBER, EMAIL, ADDRESS, HOURS constants
    └── format.ts           # formatPrice, formatDuration
```

Keep components presentational and prop-driven. No client-state libraries. The booking section is the only `"use client"` component (for the radio selection).

---

## 7. Quality bar

- **Responsive:** mobile-first. Test mental model: 375px, 768px, 1280px. No horizontal scroll at any width.
- **Accessible:** semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`), descriptive `aria-label`s on icon-only buttons, all images have meaningful `alt` text (not "image of..."), focus states visible, color contrast AA minimum on body text.
- **Performance:** Lighthouse Performance ≥ 90 on the build. Use `next/image` with explicit `sizes` props. Lazy-load below-the-fold sections' images.
- **SEO:** complete `metadata` export in `layout.tsx` — title template, description, OpenGraph image (use Skyla's hero photo), `lang="en"`, canonical URL placeholder.
- **No console errors or hydration warnings** in dev or production builds.
- **`npm run build` must pass** with zero TypeScript or ESLint errors.

---

## 8. Explicitly out of scope (do NOT build)

- Real booking calendar or availability logic
- Auth, accounts, admin panel
- CMS integration (content lives in TS files for v1)
- Payment processing
- i18n / translation
- Analytics scripts
- Cookie banner
- A blog
- Service worker / PWA
- Tests (unit/e2e) — we'll add later if needed

---

## 9. Definition of done

When you finish, the repo should:

1. Run cleanly: `npm install && npm run dev` opens a styled, fully-populated site at `localhost:3000`.
2. Build cleanly: `npm run build && npm start` works without errors or warnings.
3. Have **passed your own visual self-review pass** (see §9a below) — not just compile-clean, but actually looking right.
4. Have a populated `DESIGN.md` documenting your color/type/spacing decisions and any deviations from this spec (so the next iteration has context).
5. Have a `README.md` with: project name, one-paragraph description, prerequisites, install/dev/build commands, a "Content to update" checklist of every `TODO` placeholder (bio, address, phone, WhatsApp number, real testimonials, etc.).
6. Commit your work in logical chunks with conventional-commit-style messages (`feat: scaffold next.js app`, `feat: hero section`, etc.). Do not force-push.

### 9a. Visual self-review (mandatory before declaring done)

You have access to Chrome MCP and computer-use tools — use them. Code-clean is not the same as design-clean. Before saying you're done:

1. Start `npm run dev` and open the site in Chrome.
2. Screenshot **every section** at three viewport widths: **375px (mobile), 768px (tablet), 1280px (desktop)**. Use the Chrome MCP `resize_window` tool, not devtools-emulation.
3. For each screenshot, write yourself a one-line critique: alignment, spacing rhythm, contrast, typographic hierarchy, image cropping, CTA prominence, anything that looks "off." Be honest — if a section looks generic, say so.
4. Fix the issues you find. Re-screenshot. Iterate until each section reads as intentional and on-brand at every breakpoint.
5. Run through the booking flow: select different rituals, click "Book via WhatsApp" and "Email Skyla," verify the prefilled message matches the selected service.
6. Tab through the page with the keyboard — every interactive element must have a visible focus state.
7. Open Chrome devtools console; confirm zero errors and zero hydration warnings.

Only after this self-review passes should you declare done. Include a short "Visual review notes" section in `DESIGN.md` summarizing what you fixed during this pass — that gives Dylan context when he does his own review afterward.

---

## 10. Working style

- **Plan before you code.** Briefly outline your approach in chat, then execute.
- **Ask before deviating** from the spec on anything material (stack swap, dropping a section, replacing the palette). Small judgment calls — typography fine-tuning, exact spacing, micro-interactions — just make them and note them in `DESIGN.md`.
- **Mark every placeholder** with `TODO:` comments so we can grep them later.
- **Do not invent content** — phone numbers, addresses, testimonials, bio details. Use clearly-labeled placeholders.
- After the first pass is shipped, we'll open the site in a browser and iterate visually. Build with that loop in mind: clear section boundaries, easy-to-tweak Tailwind classes, no premature abstraction.

When you're ready, start by confirming the plan and proposing your first three commits. Then build.
