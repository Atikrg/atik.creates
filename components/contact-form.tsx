"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-small text-foreground placeholder:text-subtle-foreground/60 transition-colors focus:border-violet focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-violet/30";

/**
 * Contact form that POSTs to Formspree (`site.formEndpoint`). Works on the
 * static export — no server involved. Shows inline success/error states.
 */
export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-3 text-left", className)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-caption text-subtle-foreground">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className={fieldClasses}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-caption text-subtle-foreground">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClasses}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-caption text-subtle-foreground">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="What are you trying to build or automate?"
          className={cn(fieldClasses, "resize-y")}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-caption text-subtle-foreground">
          I&apos;ll reply within a day — no pitch, no pressure.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-small font-semibold text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>

      {status === "success" && (
        <p
          role="status"
          className="rounded-xl border border-violet/40 bg-violet/10 px-4 py-3 text-small text-foreground"
        >
          Message sent — I&apos;ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-small text-foreground"
        >
          Something went wrong. Please try again, or email me directly at{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-violet">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}