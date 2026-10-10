"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Interactive "signal mesh": drifting nodes that link to nearby neighbours and
 * reach toward the pointer — a visual metaphor for connected automations.
 * Purely decorative (aria-hidden), pauses off-screen, and renders a single
 * static frame when the visitor prefers reduced motion.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const LINK = 132;
    const PLINK = 190;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    const pointer = { x: 0, y: 0, active: false };

    let palette = { link: "124,92,255", node: "198,190,255", ptr: "34,211,238" };
    const readPalette = () => {
      palette =
        document.documentElement.getAttribute("data-theme") === "light"
          ? { link: "106,52,240", node: "74,64,150", ptr: "14,127,156" }
          : { link: "124,92,255", node: "198,190,255", ptr: "34,211,238" };
    };

    const build = () => {
      readPalette();
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = reduce
        ? 42
        : Math.round(Math.min(96, Math.max(24, (w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.3 + 0.7,
      }));
    };

    const frame = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);

      if (move) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -30) n.x = w + 30;
          else if (n.x > w + 30) n.x = -30;
          if (n.y < -30) n.y = h + 30;
          else if (n.y > h + 30) n.y = -30;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const t = 1 - Math.sqrt(d2) / LINK;
            ctx.strokeStyle = `rgba(${palette.link},${(t * 0.16).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (pointer.active) {
        for (const n of nodes) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < PLINK * PLINK) {
            const t = 1 - Math.sqrt(d2) / PLINK;
            ctx.strokeStyle = `rgba(${palette.ptr},${(t * 0.4).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${palette.node},0.55)`;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      frame(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x > -40 && pointer.x < w + 40 && pointer.y > -40 && pointer.y < h + 40;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) frame(false);
    });
    ro.observe(canvas);

    const mo = new MutationObserver(() => {
      readPalette();
      if (reduce) frame(false);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let io: IntersectionObserver | null = null;

    build();
    if (reduce) {
      frame(false);
    } else {
      start();
      if (fine) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("pointerleave", onLeave);
      }
      io = new IntersectionObserver(([entry]) => {
        running = entry?.isIntersecting ?? true;
        if (running) start();
        else stop();
      });
      io.observe(canvas);
    }

    return () => {
      stop();
      ro.disconnect();
      mo.disconnect();
      io?.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}