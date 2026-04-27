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
                  &ldquo;Healing begins the moment you allow yourself to receive.&rdquo;
                </p>
                <p className="mt-1 font-sans text-[10px] text-ink-soft">— Skyla</p>
              </div>
            </blockquote>
          </div>

          {/* Copy column */}
          <div className="flex flex-col gap-6">
            <Eyebrow>Meet Skyla</Eyebrow>

            <h2 className="font-serif text-h2 leading-snug text-ink">
              A moment for yourself is a gift to your whole being.
            </h2>

            <p className="font-serif text-base leading-relaxed text-ink-soft">
              Skyla&apos;s love for people and her desire to help others feel better led her into
              massage and wellness work. What began as a gifted online massage course grew into
              in-person training and certification in Thailand, where she deepened her experience
              and found a practice she truly enjoys.
            </p>

            <p className="font-serif text-base leading-relaxed text-ink-soft">
              Her sessions are guided by touch, care, and gentle movement, with many treatments
              including a touch of sound healing. Skyla creates a calm space where clients can
              receive, rebalance, and reconnect with their bodies.
            </p>

            {/* Credentials */}
            <div className="border-t border-line pt-6">
              <p className="mb-3 font-sans text-label font-semibold uppercase tracking-[0.1em] text-clay">
                Training & Credentials
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Therapist course certificate: Oil massage, Thai massage, face massage, reflexology, lymphatic massage, body scrub, Thai traditional massage, and herbal massage",
                  "Swedish massage certificate",
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
