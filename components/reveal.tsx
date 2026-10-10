"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades + lifts its children in once they scroll into view.
 * Falls back to visible immediately when reduced motion is requested (see globals.css).
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.visible = "true";
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
