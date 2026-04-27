import React from "react";

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  /** Native anchor target */
  target?: string;
  rel?: string;
}

/**
 * Reusable CTA button. Renders as <a> when href is provided, else <button>.
 */
export default function PrimaryButton({
  href,
  onClick,
  children,
  className = "",
  variant = "solid",
  target,
  rel,
}: PrimaryButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-label font-semibold uppercase tracking-[0.1em] transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  const variants = {
    solid:
      "bg-primary text-white hover:bg-primary-deep active:scale-95",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white active:scale-95",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} type="button">
      {children}
    </button>
  );
}
