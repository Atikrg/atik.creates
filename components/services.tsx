import type { ReactNode } from "react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { Watermark } from "@/components/watermark";
import { cn } from "@/lib/cn";
import { services } from "@/data/site";

function SpotlightIcon({ id }: { id: string }) {
  const common = {
    className: "size-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (id) {
    case "ai-automation":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="18" cy="8" r="2.2" />
          <circle cx="7" cy="18" r="2.2" />
          <path d="M7.6 7.4 15.9 7M7.8 16.1l1.9-4.5 5.9-2.9" />
        </svg>
      );
    case "web-applications":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
          <path d="M3 9h18M6.5 6.6h.01M9.5 6.6h.01" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M11 18.5h2" />
        </svg>
      );
  }
}

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

export function Services(): ReactNode {
  return (
    <Section id="services" className="relative overflow-hidden border-t border-border">
      <Watermark text="SERVICES" className="hidden md:grid" />
      <Container className="relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="[ 01 / Services ]"
            title={
              <>
                Three ways I help you{" "}
                <span className="text-gradient">move faster</span>.
              </>
            }
            description="Automate the boring parts, launch a product, or put your business in your customers' pocket — it's all covered."
          />
          <a
            href="#contact"
            className="group hidden items-center gap-3 font-mono text-caption uppercase text-subtle-foreground transition-colors hover:text-violet md:inline-flex"
          >
            Start a project
            <Arrow className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 90} className="h-full">
              <SpotlightCard className="p-7">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl border border-border-strong bg-surface-2 text-violet">
                    <SpotlightIcon id={service.id} />
                  </span>
                  <span className="font-mono text-caption text-subtle-foreground">
                    {service.index}
                  </span>
                </div>

                <h3 className="text-h3 mt-8 text-foreground">{service.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {service.blurb}
                </p>

                <ul className="mt-7 flex flex-col gap-2.5 border-t border-border pt-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-small text-foreground/90"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet to-cyan" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="group/link mt-7 inline-flex items-center gap-2 text-small font-medium text-foreground transition-colors hover:text-violet"
                >
                  Discuss this service
                  <Arrow className="transition-transform group-hover/link:translate-x-1" />
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}