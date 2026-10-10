import { services } from "@/data/site";

export function Spark({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2c.6 4.5 4.5 8.4 9 9-4.5.6-8.4 4.5-9 9-.6-4.5-4.5-8.4-9-9 4.5-.6 8.4-4.5 9-9Z" />
    </svg>
  );
}

/**
 * Oversized outlined marquee of the three disciplines — a slow, endless ticker.
 * Purely decorative; fades at the edges.
 */
export function DisciplineTicker({ reverse = false }: { reverse?: boolean }) {
  const set = [...services, ...services];
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className={`marquee-track items-center gap-12 ${
          reverse ? "marquee-reverse" : ""
        }`}
      >
        {set.map((service, i) => (
          <span
            key={`${service.id}-${i}`}
            className="flex items-center gap-12 whitespace-nowrap font-display font-bold leading-none"
          >
            <span className="text-stroke text-[clamp(2.75rem,6vw,6.5rem)]">
              {service.title}
            </span>
            <Spark className="size-5 shrink-0 text-violet/70" />
          </span>
        ))}
      </div>
    </div>
  );
}