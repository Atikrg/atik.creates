"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Buttery Lenis scroll, wired to GSAP ScrollTrigger so anchored/timeline
 * animations stay in sync. Anchor links (nav / "back to top") scroll smoothly
 * with an offset that clears the fixed header. Skipped for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);

    const onClick = (event: MouseEvent) => {
      const source = event.target;
      if (!(source instanceof HTMLElement)) return;
      const anchor = source.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
    };

    document.addEventListener("click", onClick);
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}