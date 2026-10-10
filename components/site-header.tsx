"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function Envelope({ className }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border glass" : "border-b border-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label={site.name}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-small font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={`mailto:${site.email}`}
            aria-label="Send a mail"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-border-strong hover:text-violet"
          >
            <Envelope className="size-[18px]" />
          </a>
          <a
            href={site.calendarUrl}
            className="hidden rounded-full bg-foreground px-5 py-2.5 text-small font-semibold text-background transition-colors hover:bg-foreground/90 sm:inline-flex"
          >
            Book a call
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-border text-foreground md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-border glass transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-72 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-site flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.calendarUrl}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-foreground px-5 py-3 text-center text-small font-semibold text-background"
          >
            Book a call
          </a>
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="rounded-full border border-border-strong px-5 py-3 text-center text-small font-medium text-foreground"
          >
            Send a mail
          </a>
        </nav>
      </div>
    </header>
  );
}
