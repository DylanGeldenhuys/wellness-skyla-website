import Eyebrow from "@/components/ui/Eyebrow";

// TODO: Replace placeholder testimonials with real client quotes
const testimonials = [
  {
    id: 1,
    quote:
      "TODO: Real testimonial — a sentence or two from a client about their experience with Skyla. Keep it specific and authentic.",
    name: "Client Name", // TODO: real name (with permission)
    detail: "TODO: e.g. Aroma Oil Massage",
  },
  {
    id: 2,
    quote:
      "TODO: Real testimonial — a sentence or two from a client about their experience with Skyla. Keep it specific and authentic.",
    name: "Client Name", // TODO: real name (with permission)
    detail: "TODO: e.g. Lymphatic Drainage",
  },
  {
    id: 3,
    quote:
      "TODO: Real testimonial — a sentence or two from a client about their experience with Skyla. Keep it specific and authentic.",
    name: "Client Name", // TODO: real name (with permission)
    detail: "TODO: e.g. Thai Massage",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-surface py-16 lg:py-24"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-center text-center fade-up">
          <Eyebrow className="mb-4">Kind Words</Eyebrow>
          <h2 className="font-serif text-h2 text-ink">What clients say</h2>
          <div className="mt-6 h-px w-16 bg-clay opacity-40" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-bg p-8"
            >
              {/* Decorative quote mark */}
              <span className="font-serif text-5xl leading-none text-clay/30" aria-hidden="true">
                &ldquo;
              </span>
              <p className="flex-1 font-serif text-base italic leading-relaxed text-ink-soft">
                {t.quote}
              </p>
              <footer className="border-t border-line pt-4">
                <p className="font-sans text-sm font-semibold text-ink">{t.name}</p>
                <p className="font-sans text-xs text-ink-soft">{t.detail}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
