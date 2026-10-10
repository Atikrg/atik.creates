import type { ReactNode } from "react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { Watermark } from "@/components/watermark";
import { process, stats } from "@/data/site";

export function Process(): ReactNode {
  return (
    <Section
      id="process"
      className="relative overflow-hidden border-y border-border bg-bg-elev/60"
    >
      <Watermark text="PROCESS" className="hidden md:grid" />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="[ 03 / Process ]"
          title={
            <>
              A simple path from{" "}
              <span className="text-gradient">idea to launch</span>.
            </>
          }
          description="No black boxes, no long silences. You always know what's happening and what's next."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.index} as="li" delay={i * 80} className="group h-full">
              <div className="relative flex h-full flex-col gap-4 overflow-hidden bg-surface p-7">
                <span className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-violet to-cyan transition-[width] duration-500 group-hover:w-full" />
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-h3 leading-none text-stroke">
                    {step.index}
                  </span>
                </div>
                <h3 className="text-h3 text-foreground">{step.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {step.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-12 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-h2 text-foreground">
                  {stat.value}
                </dd>
                <span className="text-small text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}