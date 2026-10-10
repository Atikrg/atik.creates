"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/**
 * Giant outlined section watermark ("01 / SERVICES") that drifts gently with
 * scroll. Decorative and pointer-transparent.
 */
export function Watermark({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = inner.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const tween = gsap.fromTo(
      el,
      { yPercent: 18 },
      {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 grid place-items-center overflow-hidden",
        className,
      )}
    >
      <span
        ref={inner}
        className="text-stroke select-none whitespace-nowrap font-display font-bold leading-none opacity-45"
        style={{ fontSize: "clamp(6rem, 20vw, 22rem)" }}
      >
        {text}
      </span>
    </div>
  );
}