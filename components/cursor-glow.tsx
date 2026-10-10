"use client";

import { useEffect, useRef } from "react";

/**
 * A soft violet glow that trails the pointer — desktop / fine-pointer only,
 * and only when the visitor doesn't ask for reduced motion. Pure decoration.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.4;
    let cx = x;
    let cy = y;
    let raf = 0;

    const loop = () => {
      cx += (x - cx) * 0.1;
      cy += (y - cy) * 0.1;
      el.style.transform = `translate3d(${cx - 260}px, ${cy - 260}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[520px] rounded-full bg-violet/[0.08] blur-3xl md:block"
      aria-hidden="true"
    />
  );
}