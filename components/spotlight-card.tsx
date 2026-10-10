"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card with a violet spotlight that follows the pointer. Expects to sit inside
 * a `.group` context? No — it manages its own hover state.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "group relative h-full overflow-hidden rounded-[1.5rem] border border-border bg-surface transition-colors duration-300 hover:border-border-strong",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(124 92 255 / 0.14), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}