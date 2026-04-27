interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Small all-caps label used above headings and on cards.
 * Plus Jakarta Sans, 0.75rem, weight 600, letter-spacing 0.1em.
 */
export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`font-sans text-label font-semibold uppercase tracking-[0.1em] text-clay ${className}`}
    >
      {children}
    </span>
  );
}
