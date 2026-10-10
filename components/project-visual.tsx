import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { VisualDevice } from "@/data/site";

type Tint = "violet" | "cyan";

const tintRgb: Record<Tint, string> = {
  violet: "124 92 255",
  cyan: "34 211 238",
};

const bar = "rounded-full bg-foreground/15";
const tintBg: Record<Tint, string> = { violet: "bg-violet", cyan: "bg-cyan" };
const tintSoft: Record<Tint, string> = { violet: "bg-violet/25", cyan: "bg-cyan/25" };

type Props = {
  title: string;
  tagline: string;
  device: VisualDevice;
  tint?: Tint;
  compact?: boolean;
  className?: string;
};

/**
 * Generated device mockup (browser / automation flow / phone) — stands in for a
 * real screenshot so the site stays image-free. Tinted from the work item data.
 */
export function ProjectVisual({
  title,
  tagline,
  device,
  tint = "violet",
  compact = false,
  className,
}: Props) {
  const rgb = tintRgb[tint];
  const style = {
    background: `radial-gradient(120% 90% at 20% 10%, rgb(${rgb} / 0.42), transparent 60%), radial-gradient(90% 80% at 90% 100%, rgb(${rgb} / 0.26), transparent 62%), var(--surface-2)`,
  } as CSSProperties;

  return (
    <div
      role="img"
      aria-label={`${title} — ${device === "phone" ? "mobile app" : device === "flow" ? "automation flow" : "website"} mockup`}
      style={style}
      className={cn(
        "relative isolate flex size-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid-bg opacity-[0.06]" />
      {device === "browser" && (
        <BrowserMock title={title} tagline={tagline} tint={tint} compact={compact} />
      )}
      {device === "flow" && <FlowMock tint={tint} compact={compact} />}
      {device === "phone" && (
        <PhoneMock title={title} tagline={tagline} tint={tint} />
      )}
    </div>
  );
}

function BrowserMock({
  title,
  tagline,
  tint,
  compact,
}: {
  title: string;
  tagline: string;
  tint: Tint;
  compact: boolean;
}) {
  const domain = `${title.toLowerCase().replace(/[^a-z]/g, "").slice(0, 14)}.com`;
  return (
    <div className="w-[86%] overflow-hidden rounded-xl border border-border bg-background shadow-[0_30px_60px_-30px_rgb(0_0_0_/_0.85)]">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
        </span>
        <span className="mx-auto rounded-md bg-surface px-3 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
          {domain}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.8rem] font-bold">{title}</span>
          <span className="flex gap-2">
            <span className={cn(bar, "h-1.5 w-8")} />
            <span className={cn(bar, "h-1.5 w-8")} />
            <span className={cn("h-4 w-12 rounded-full", tintBg[tint])} />
          </span>
        </div>
        <div className="mt-1 flex flex-col gap-2">
          <span className="font-display text-[clamp(0.85rem,1.8vw,1.35rem)] leading-tight font-bold tracking-tight">
            {tagline}
          </span>
          <span className={cn(bar, "h-1.5 w-3/4")} />
          <span className={cn(bar, "h-1.5 w-1/2")} />
        </div>
        {!compact && (
          <div className="mt-1 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface/60 p-2"
              >
                <span className={cn("size-4 rounded", tintSoft[tint])} />
                <span className={cn(bar, "h-1 w-full")} />
                <span className={cn(bar, "h-1 w-2/3")} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FlowMock({ tint, compact }: { tint: Tint; compact: boolean }) {
  const nodes = compact
    ? ["Trigger", "AI reply", "Deliver"]
    : ["Trigger", "Enrich", "AI reply", "Deliver"];
  return (
    <div className="flex w-[86%] flex-col items-stretch sm:flex-row sm:items-center">
      {nodes.map((node, i) => (
        <div key={node} className="flex flex-1 flex-col items-center sm:flex-row">
          <div className="flex w-full flex-col gap-1.5 rounded-xl border border-border bg-background/90 p-3">
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "size-2 rounded-full",
                  i === nodes.length - 1 ? tintBg[tint] : "bg-foreground/25",
                )}
              />
              <span className="font-mono text-[0.6rem] tracking-wide uppercase text-muted-foreground">
                {node}
              </span>
            </span>
            <span className={cn(bar, "h-1 w-full")} />
            <span className={cn(bar, "h-1 w-2/3")} />
          </div>
          {i < nodes.length - 1 && (
            <span className="h-4 w-px bg-border sm:h-px sm:w-5 sm:shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

function PhoneMock({
  title,
  tagline,
  tint,
}: {
  title: string;
  tagline: string;
  tint: Tint;
}) {
  return (
    <div className="relative aspect-[9/19] h-[84%] max-h-72 rounded-[2rem] border-[6px] border-foreground/85 bg-background p-3">
      <span className="absolute top-2 left-1/2 h-3.5 w-14 -translate-x-1/2 rounded-full bg-foreground/85" />
      <div className="mt-5 flex h-[calc(100%-1.25rem)] flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.7rem] font-bold">{title}</span>
          <span className={cn("size-4 rounded-full", tintSoft[tint])} />
        </div>
        <div className={cn("rounded-xl p-2.5 text-background", tintBg[tint])}>
          <span className="block text-[0.5rem] font-medium opacity-80">{tagline}</span>
          <span className="block font-display text-base leading-tight font-bold">{title}</span>
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2">
            <span className={cn("size-5 shrink-0 rounded-md", tintSoft[tint])} />
            <span className="flex flex-1 flex-col gap-1">
              <span className={cn(bar, "h-1 w-4/5")} />
              <span className={cn(bar, "h-1 w-1/2")} />
            </span>
          </div>
        ))}
        <div className="mt-auto flex justify-around border-t border-border pt-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn("size-2.5 rounded", i === 0 ? tintBg[tint] : "bg-foreground/15")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}