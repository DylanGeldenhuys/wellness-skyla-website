"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver that adds .in-view to any .fade-up
 * element once it enters the viewport. Also immediately reveals elements
 * already in view on mount (e.g. after fast scroll or page reload).
 */
export default function AnimationObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".fade-up");

    // Immediately reveal any elements already visible (above fold / in view)
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("in-view");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      // Trigger 150px BEFORE the element enters the viewport
      { threshold: 0, rootMargin: "0px 0px 150px 0px" }
    );

    elements.forEach((el) => {
      if (!el.classList.contains("in-view")) {
        observer.observe(el);
      }
    });

    // Safety sweep on scroll — reveals any elements missed during fast scroll
    const sweep = () => {
      document.querySelectorAll<HTMLElement>(".fade-up:not(.in-view)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 50) {
          el.classList.add("in-view");
        }
      });
    };
    window.addEventListener("scroll", sweep, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", sweep);
    };
  }, []);

  return null;
}
