import Image from "next/image";

const images = [
  {
    src: "/images/stock/stock-2.jpg",
    alt: "Skilled hands working on a client's back during a massage",
    offset: "mt-0",
  },
  {
    src: "/images/skyla/skyla-holding-mattress-happy.jpg",
    alt: "Skyla arriving ready for a session",
    offset: "mt-12 lg:mt-16",
  },
  {
    src: "/images/stock/stock-1.jpg",
    alt: "Aromatic oils and fresh towels laid out for a treatment",
    offset: "mt-0",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-bg py-16 lg:py-24 overflow-hidden" aria-label="Gallery">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center fade-up">
          <h2 className="font-serif text-h2 text-ink">The atmosphere</h2>
          <p className="mt-4 font-serif text-base text-ink-soft">
            Warm, unhurried, and entirely yours.
          </p>
        </div>

        {/* Staggered 3-up grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 items-start">
          {images.map((img) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-2xl ${img.offset}`}
            >
              {/* Warm overlay */}
              <div className="relative h-72 sm:h-80 lg:h-96">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#FFF8F3]/40 to-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
