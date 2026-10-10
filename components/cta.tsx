import type { ReactNode } from "react";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { Watermark } from "@/components/watermark";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Cta(): ReactNode {
  const offerHref = `mailto:${site.email}?subject=${encodeURIComponent(
    site.offer.subject,
  )}&body=${encodeURIComponent(site.offer.body)}`;

  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="aurora-blob left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 bg-violet/30" />
        <div className="aurora-blob bottom-0 right-1/4 h-72 w-72 bg-cyan/25 [animation-delay:-9s]" />
      </div>

      <Watermark text="REACH OUT" className="hidden md:grid" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <Eyebrow>[ 04 / Let&apos;s build ]</Eyebrow>

            <h2
              className="font-display font-bold leading-[1.02] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6.25rem)" }}
            >
              Got something to{" "}
              <span className="text-gradient">automate or ship</span>?
            </h2>

            <p className="text-body-lg max-w-xl text-muted-foreground">
              Tell me what you&apos;re trying to build. I&apos;ll reply within a
              day with a clear next step — no pitch, no pressure.
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.calendarUrl}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-small font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                Book a call
                <Arrow />
              </a>
              <a
                href={offerHref}
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-small font-medium text-foreground transition-colors hover:border-violet/60 hover:bg-violet/10"
              >
                Make me an offer
                <Arrow className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="card-surface mt-10 w-full max-w-xl p-5 text-left sm:p-6">
              <ContactForm />
            </div>

            <div className="flex flex-col items-center gap-2 pt-2">
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-caption uppercase tracking-[0.14em] text-subtle-foreground underline-offset-4 transition-colors hover:text-violet hover:underline"
              >
                {site.email}
              </a>
              <p className="max-w-md text-small text-subtle-foreground">
                {site.offer.note}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}