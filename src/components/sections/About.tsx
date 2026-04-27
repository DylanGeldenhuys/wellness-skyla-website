import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";

export default function About() {
  return (
    <section id="about" className="bg-bg py-16 lg:py-24" aria-label="About Skyla">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* Image column */}
          <div className="relative pb-10">
            {/* Main action photo — Skyla working in golden backlit light */}
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl sm:h-[560px]">
              <Image
                src="/images/skyla/skyla-giving-massage.jpg"
                alt="Skyla giving a massage in warm golden light"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Portrait + pull-quote card overlaid bottom-right */}
            {/* TODO: copywriting — replace pull-quote below */}
            <blockquote className="absolute -bottom-2 right-4 flex items-center gap-3 max-w-[280px] rounded-2xl bg-surface-warm p-4 shadow-lg sm:right-6 lg:-right-6">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-line">
                <Image
                  src="/images/skyla/skyla-face.jpg"
                  alt="Skyla, founder of Wellness with Skyla"
                  fill
                  className="object-cover object-top"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-serif text-xs italic leading-relaxed text-ink">
                  &ldquo;Every body holds its own story. My work is simply to listen.&rdquo;
                </p>
                <p className="mt-1 font-sans text-[10px] text-ink-soft">— Skyla</p>
              </div>
            </blockquote>
          </div>

          {/* Copy column */}
          <div className="flex flex-col gap-6">
            <Eyebrow>Meet Skyla</Eyebrow>

            {/* TODO: copywriting — headline is a placeholder */}
            <h2 className="font-serif text-h2 leading-snug text-ink">
              Hands that hold,<br />a presence that heals.
            </h2>

            {/* TODO: bio copy — replace both paragraphs with Skyla's real story */}
            <p className="font-serif text-base leading-relaxed text-ink-soft">
              TODO: Skyla&apos;s bio paragraph one — her journey into massage therapy, what drew
              her to this work, and the philosophy behind her practice. Keep it personal, warm,
              and specific to her story.
            </p>

            <p className="font-serif text-base leading-relaxed text-ink-soft">
              TODO: Skyla&apos;s bio paragraph two — her approach to each session, what clients
              can expect, and what makes her practice distinct. Could mention her training,
              modalities she loves, or the kind of space she creates.
            </p>

            {/* Credentials */}
            {/* TODO: replace with Skyla's real qualifications and certifications */}
            <div className="border-t border-line pt-6">
              <p className="mb-3 font-sans text-label font-semibold uppercase tracking-[0.1em] text-clay">
                Training & Credentials
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "TODO: Qualification or certification",
                  "TODO: Qualification or certification",
                  "TODO: Qualification or certification",
                ].map((cred, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-clay" />
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
