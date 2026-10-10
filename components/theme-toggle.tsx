"use client";

import { useLayoutEffect } from "react";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "theme";

function Sun({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/**
 * Light/dark toggle. The initial theme is applied pre-paint by the inline
 * script in the root layout; this re-applies it after React's dev remount and
 * flips the `data-theme` attribute (+ persists the choice) on click.
 */
export function ThemeToggle({ className }: { className?: string }) {
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const theme =
        stored === "light" || stored === "dark"
          ? stored
          : window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
      document.documentElement.setAttribute("data-theme", theme);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "light" ? "#f4f4fa" : "#07070b");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-border-strong hover:text-violet",
        className,
      )}
    >
      <Sun className="theme-sun col-start-1 row-start-1 size-[18px]" />
      <Moon className="theme-moon col-start-1 row-start-1 size-[18px]" />
    </button>
  );
}