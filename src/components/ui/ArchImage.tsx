import Image from "next/image";

interface ArchImageProps {
  src: string;
  alt: string;
  /** Tailwind classes for the outer wrapper (controls size/aspect) */
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Image displayed in an arched container — rectangle with fully rounded top.
 * The parent must be positioned (relative) with an explicit height or aspect ratio.
 */
export default function ArchImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ArchImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[9999px_9999px_0_0] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
