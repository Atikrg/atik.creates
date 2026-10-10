import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-display text-[1.0625rem] font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      atik<span className="text-gradient">.</span>creates
    </span>
  );
}
