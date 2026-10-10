import { cn } from "@/lib/cn";

type State = "done" | "active" | "todo";

const steps: { label: string; tag: string; state: State }[] = [
  { label: "New lead captured", tag: "trigger", state: "done" },
  { label: "CRM enriched", tag: "sync", state: "done" },
  { label: "AI drafted the reply", tag: "agent", state: "active" },
  { label: "Delivered to inbox", tag: "ship", state: "todo" },
];

const stateDot: Record<State, string> = {
  done: "border-violet/50 bg-violet/15 text-violet",
  active: "border-cyan/60 bg-cyan/15 text-cyan",
  todo: "border-border bg-surface text-subtle-foreground",
};

const stateGlyph: Record<State, string> = { done: "✓", active: "⟳", todo: "·" };

/**
 * Decorative "automation.run" panel — an illustrative pipeline that gives the
 * hero a concrete, on-theme visual on wide screens.
 */
export function HeroConsole() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-[radial-gradient(55%_55%_at_75%_15%,rgb(124_92_255_/_0.28),transparent_72%)] blur-2xl"
      />
      <div className="card-surface glass relative overflow-hidden p-5 shadow-[0_40px_90px_-45px_rgb(0_0_0_/_0.95)]">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2.5 font-mono text-caption text-subtle-foreground">
              automation.run
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-caption uppercase text-subtle-foreground">
            <span className="pulse-dot size-1.5 rounded-full bg-cyan" />
            live
          </span>
        </div>

        <ol className="relative mt-2">
          <span
            aria-hidden="true"
            className="absolute left-[15px] top-7 bottom-7 w-px bg-border"
          />
          <span
            aria-hidden="true"
            className="absolute left-[15px] top-7 h-[52%] w-px bg-gradient-to-b from-violet to-cyan opacity-80"
          />
          <span
            aria-hidden="true"
            className="flow-dot absolute left-[13px] top-7 size-[7px] rounded-full bg-cyan shadow-[0_0_10px] shadow-cyan"
          />
          {steps.map((step) => (
            <li key={step.label} className="relative flex items-center gap-3.5 py-3">
              <span
                className={cn(
                  "relative z-[1] grid size-8 shrink-0 place-items-center rounded-full border text-[11px] leading-none",
                  stateDot[step.state],
                )}
              >
                {stateGlyph[step.state]}
              </span>
              <span
                className={cn(
                  "flex-1 text-small",
                  step.state === "todo" ? "text-subtle-foreground" : "text-foreground",
                )}
              >
                {step.label}
              </span>
              <span className="font-mono text-caption uppercase text-subtle-foreground">
                {step.tag}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-2 flex items-center justify-between border-t border-border pt-4 font-mono text-caption text-subtle-foreground">
          <span>avg. reply &lt; 24h</span>
          <span className="text-cyan">5 days → first demo</span>
        </div>
      </div>
    </div>
  );
}