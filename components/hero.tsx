"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { DisciplineTicker } from "@/components/ticker";
import { HeroCanvas } from "@/components/hero-canvas";
import { HeroConsole } from "@/components/hero-console";
import { site, stats } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

function AuroraBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_72%_62%_at_50%_0%,#000_35%,transparent_100%)]" />
      <div className="hero-blob absolute -top-40 left-[12%] h-[34rem] w-[34rem]">
        <div className="aurora-blob inset-0 bg-violet/40" />
      </div>
      <div className="hero-blob absolute -top-24 right-[8%] h-[30rem] w-[30rem]">
        <div className="aurora-blob inset-0 bg-cyan/30 [animation-delay:-6s]" />
      </div>
    </div>
  );
}

const metaItems = ["Remote · Worldwide", "Founder-led", "Est. 2024"]; // year: DUMMY

export function Hero(): ReactNode {
  const root = useRef<HTMLElement>(null);
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(
          "[data-split] .split-inner",
          { yPercent: 110 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power4.out",
            stagger: 0.1,
            delay: 0.2,
          },
        );

        const scroll = {
          trigger: rootEl,
          start: "top top",
          end: "bottom top",
          scrub: true,
        } as const;
        gsap.to("[data-hero-content]", {
          yPercent: -9,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: scroll,
        });
        gsap.to(".hero-blob", { yPercent: 30, ease: "none", scrollTrigger: scroll });
        gsap.to("[data-hero-canvas]", {
          scale: 1.18,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: scroll,
        });
      }

      if (!fine || reduce) return;

      const blobs = gsap.utils.toArray<HTMLElement>(".hero-blob");
      const blobX = blobs.map((b) =>
        gsap.quickTo(b, "x", { duration: 0.9, ease: "power3" }),
      );
      const blobY = blobs.map((b) =>
        gsap.quickTo(b, "y", { duration: 0.9, ease: "power3" }),
      );
      const lift = rootEl.querySelector<HTMLElement>("[data-hero-lift]");
      const liftX = lift ? gsap.quickTo(lift, "x", { duration: 0.8, ease: "power3" }) : null;
      const liftY = lift ? gsap.quickTo(lift, "y", { duration: 0.8, ease: "power3" }) : null;

      const onMove = (event: PointerEvent) => {
        const rect = rootEl.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;

        if (spot.current) {
          spot.current.style.setProperty("--hx", `${event.clientX - rect.left}px`);
          spot.current.style.setProperty("--hy", `${event.clientY - rect.top}px`);
          spot.current.dataset.active = "true";
        }
        blobs.forEach((_, i) => {
          const depth = (i % 2 ? -1 : 1) * 26;
          blobX[i]?.(nx * depth);
          blobY[i]?.(ny * depth);
        });
        liftX?.(nx * -14);
        liftY?.(ny * -14);
      };
      const onLeave = () => {
        if (spot.current) spot.current.dataset.active = "false";
      };

      rootEl.addEventListener("pointermove", onMove);
      rootEl.addEventListener("pointerleave", onLeave);
      return () => {
        rootEl.removeEventListener("pointermove", onMove);
        rootEl.removeEventListener("pointerleave", onLeave);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <AuroraBackdrop />

      <div
        data-hero-canvas
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <HeroCanvas className="size-full opacity-80 [mask-image:radial-gradient(ellipse_90%_85%_at_50%_42%,#000_30%,transparent_100%)]" />
      </div>
      <div
        ref={spot}
        aria-hidden="true"
        className="hero-spotlight pointer-events-none absolute inset-0 -z-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div
        data-hero-content
        className="container-site relative z-10 grid flex-1 grid-cols-1 items-center gap-x-14 gap-y-14 pt-32 pb-12 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow className="inline-flex items-center gap-2 rounded-full border border-border glass px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_10px] shadow-cyan" />
              Available for new projects
            </Eyebrow>
          </Reveal>

          <div data-hero-lift>
            <h1
              data-split
              className="text-display mt-8 font-bold tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.25rem, 3.7vw, 3.5rem)" }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="split-inner">I turn ideas into</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="split-inner">
                  <span className="text-gradient">AI automations,</span> web
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="split-inner">
                  apps &amp; <em className="font-serif italic">mobile apps.</em>
                </span>
              </span>
            </h1>
          </div>

          <Reveal delay={140}>
            <p className="text-body-lg mt-9 max-w-xl text-muted-foreground">
              {site.description}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.calendarUrl}
                className="rounded-full bg-foreground px-7 py-3.5 text-center text-small font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                Book a call
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  site.offer.subject,
                )}`}
                className="rounded-full border border-border-strong px-7 py-3.5 text-center text-small font-medium text-foreground transition-colors hover:border-violet/60 hover:bg-violet/10"
              >
                Send a mail
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-caption uppercase text-subtle-foreground">
              {metaItems.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-violet/70" aria-hidden="true">
                      /
                    </span>
                  )}
                  {item}
                </span>
              ))}
            </p>
          </Reveal>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <Reveal delay={200}>
            <HeroConsole />
          </Reveal>
        </div>
      </div>

      <Reveal className="relative z-10">
        <div className="border-y border-border">
          <Container>
            <dl className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-background px-5 py-6">
                  <dt className="font-mono text-caption uppercase text-subtle-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 text-h3 font-display font-semibold text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </Reveal>

      <Reveal className="relative z-10 pb-8 md:pb-10">
        <DisciplineTicker />
      </Reveal>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
      >
        <span className="font-mono text-caption uppercase tracking-[0.2em] text-subtle-foreground [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-border">
          <span className="scroll-dot absolute left-1/2 top-0 h-3 w-px bg-gradient-to-b from-violet to-cyan" />
        </span>
      </div>
    </section>
  );
}