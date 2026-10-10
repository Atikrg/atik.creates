# atik.creates

Personal brand site for **Atik** — AI automation, web applications and mobile applications. A single-page landing site, fully frontend-only and statically exported.

## Stack

- **Next.js 16** (App Router, Turbopack) — static export (`output: "export"`) → `out/`
- **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css`)
- **Motion**: GSAP + ScrollTrigger (parallax, split-line reveals) and Lenis (smooth, anchor-aware scrolling) — skipped for `prefers-reduced-motion`
- **Fonts**: Space Grotesk (display) · Inter (body) · JetBrains Mono (labels) · Instrument Serif italic (accent voice) via `next/font`

With a JS availability guard: reveals and split-lines only hide content when JS can animate it, so no-JS and crawlers still get the full page.

## Theme — "Aurora"

Dark indigo base with a **violet → cyan** signal gradient.

| Token | Value |
| --- | --- |
| `--bg` | `#07070b` |
| `--surface` / `--surface-2` | `#12121c` / `#171722` |
| `--fg` / `--fg-muted` / `--fg-subtle` | `#ededf5` / `#a2a2b8` / `#6f6f85` |
| `--violet` / `--cyan` | `#7c5cff` / `#22d3ee` |

## Structure

```
app/
  layout.tsx        metadata, viewport, fonts, <SmoothScroll /> (adds .js class)
  page.tsx          landing page assembly + cursor glow + film grain
  globals.css       Aurora theme tokens, base styles, reveal/split/marquee/grain CSS
  icon.svg          site icon (gradient spark)
components/
  primitives.tsx    Container, Section, Eyebrow, SectionHeading
  reveal.tsx        IntersectionObserver scroll-reveal (no-JS safe)
  smooth-scroll.tsx Lenis + ScrollTrigger sync; smooth anchor navigation
  cursor-glow.tsx   subtle violet pointer glow (fine-pointer only)
  watermark.tsx     giant outlined section numerals with scroll parallax
  spotlight-card.tsx pointer-tracking violet spotlight cards
  ticker.tsx        oversized outlined discipline marquee
  logo.tsx          wordmark brand name (no icon mark)
  theme-toggle.tsx  light/dark toggle (no-flash via inline script in layout)
  site-header.tsx   sticky header + mobile menu (client)
  hero.tsx          immersive hero: split reveal, parallax, stats band, ticker
  hero-canvas.tsx   interactive signal-mesh canvas (pointer-reactive)
  hero-console.tsx  illustrative "automation.run" pipeline panel
  services.tsx      AI Automation / Web / Mobile spotlight cards
  work.tsx          featured + compact project cards (DUMMY)
  project-visual.tsx generated device mockups (browser / flow / phone)
  process.tsx       4-step process + stats + hover connector
  cta.tsx           contact CTA with "make me an offer" negotiation option
  site-footer.tsx
data/
  site.ts           single source of truth for copy (values tagged `// DUMMY`)
lib/
  cn.ts             classnames helper
```

## Getting started

```bash
npm install
npm run dev      # local dev on http://localhost:3000
npm run build    # lint → typecheck → static export to out/
npm run lint
```

Deploy the `out/` directory to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Before launch

- Replace every value tagged `// DUMMY` in `data/site.ts` (email, calendar link, socials, metrics) with real data.
- Add production OG/Twitter images (`app/opengraph-image.png`, `app/twitter-image.png`) if desired.