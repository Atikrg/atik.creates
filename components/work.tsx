import type { ReactNode } from "react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { ProjectVisual } from "@/components/project-visual";
import { cn } from "@/lib/cn";
import { work } from "@/data/site";

function ArrowUpRight({ className }: { className?: string }) {
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
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function Pill({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 font-mono text-caption uppercase",
        accent
          ? "bg-gradient-to-r from-violet to-cyan text-background"
          : "border border-border text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function Work(): ReactNode {
  const [featured, ...rest] = work;

  if (!featured) return null;

  return (
    <Section id="work" className="relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="[ 02 / Selected work ]"
          title={
            <>
              Launched, funded, <span className="text-gradient">growing</span>.
            </>
          }
          description="A snapshot of the kind of products and systems I ship. Full case studies are one message away."
        />

        <Reveal className="mt-14 block">
          <article className="relative grid overflow-hidden rounded-[1.75rem] border border-border bg-surface md:grid-cols-2">
            <div className="flex flex-col justify-between gap-9 p-7 md:p-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  <Pill accent>Featured</Pill>
                  <Pill>{featured.category}</Pill>
                  <Pill>{featured.year}</Pill>
                </div>
                <h3 className="text-h2">
                  <a
                    href="#contact"
                    className="transition-colors after:absolute after:inset-0 hover:text-violet"
                  >
                    {featured.title}
                  </a>
                </h3>
                <p className="max-w-md text-muted-foreground">{featured.meta}</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div className="flex flex-col gap-1 border-t border-border pt-3">
                  <dt className="order-2 text-small text-muted-foreground">
                    {featured.result.label}
                  </dt>
                  <dd className="order-1 font-display text-h2 leading-none">
                    {featured.result.value}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-t border-border pt-3">
                  <dt className="order-2 text-small text-muted-foreground">Shipped</dt>
                  <dd className="order-1 font-display text-h2 leading-none">
                    {featured.year}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="relative min-h-72">
              <ProjectVisual
                title={featured.title}
                tagline={featured.tagline}
                device={featured.device}
                tint={featured.tint}
              />
            </div>
          </article>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface transition-colors hover:border-border-strong">
                <div className="relative aspect-4/3 overflow-hidden">
                  <div className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <ProjectVisual
                      title={item.title}
                      tagline={item.tagline}
                      device={item.device}
                      tint={item.tint}
                      compact
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="eyebrow">
                      {item.category} · {item.year}
                    </p>
                    <span className="font-mono text-caption text-subtle-foreground">
                      0{i + 2}
                    </span>
                  </div>
                  <h3 className="flex items-center justify-between gap-3 text-h3">
                    <a
                      href="#contact"
                      className="transition-colors after:absolute after:inset-0 hover:text-violet"
                    >
                      {item.title}
                    </a>
                    <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>
                  <p className="text-small text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {item.result.value}
                    </span>{" "}
                    {item.result.label}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}