// Single source of truth for copy + data. Values tagged `// DUMMY` are
// placeholders — replace before launch.

export const site = {
  name: "atik.creates",
  owner: "Atik",
  tagline: "AI automation, web & mobile apps",
  description:
    "I'm Atik. I design and build AI automations, web applications and mobile apps that remove busywork and ship real products — fast.",
  url: "https://atik.creates", // DUMMY
  email: "hello@atik.creates", // DUMMY
  calendarUrl: "https://cal.com/atik/intro", // DUMMY
  offer: {
    note: "Pricing is flexible — every project's scope is different, so rates are always open to negotiation.",
    subject: "Project budget proposal",
    body:
      "Hi Atik,\n\nHere's what I'd like to build and the budget I have in mind:\n\n[- project idea / scope -]\n[- links or references -]\n[- proposed budget -]\n\nLooking forward to hearing from you.",
  },
  location: "Remote · worldwide", // DUMMY
  socials: [
    { label: "GitHub", href: "https://github.com/atik" }, // DUMMY
    { label: "LinkedIn", href: "https://linkedin.com/in/atik" }, // DUMMY
    { label: "X", href: "https://x.com/atik" }, // DUMMY
  ],
} as const;

export type Service = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  features: string[];
};

export const services: Service[] = [
  {
    id: "ai-automation",
    index: "01",
    title: "AI Automation",
    blurb:
      "Turn repetitive work into systems that run themselves — agents, pipelines and integrations wired into the tools you already use.",
    features: [
      "AI agents & assistants",
      "RAG on your own data",
      "Workflow & ops automation",
      "API & app integrations",
    ],
  },
  {
    id: "web-applications",
    index: "02",
    title: "Web Applications",
    blurb:
      "Fast, production-grade web apps and dashboards — from internal tools to customer-facing SaaS, built to scale.",
    features: [
      "Next.js & React",
      "Dashboards & SaaS",
      "Auth, payments & APIs",
      "Design systems",
    ],
  },
  {
    id: "mobile-applications",
    index: "03",
    title: "Mobile Applications",
    blurb:
      "One codebase, two platforms. Native-feeling iOS and Android apps built with React Native and shipped to the stores.",
    features: [
      "React Native & Expo",
      "iOS & Android",
      "Push, offline & sync",
      "Store submission",
    ],
  },
];

export type Step = {
  index: string;
  title: string;
  blurb: string;
};

export const process: Step[] = [
  {
    index: "01",
    title: "Discover",
    blurb:
      "A short call to map the goal, the constraints and the fastest path to value. You leave with a clear plan.",
  },
  {
    index: "02",
    title: "Design",
    blurb:
      "Flows, wireframes and the shape of the build — agreed upfront so there are no surprises later.",
  },
  {
    index: "03",
    title: "Build",
    blurb:
      "Weekly demos on a real link. You see progress from day one instead of waiting for a big reveal.",
  },
  {
    index: "04",
    title: "Launch",
    blurb:
      "Ship, measure, automate. I hand over clean code and the systems to keep it running.",
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "3", label: "Core services" }, // DUMMY
  { value: "5 days", label: "To first demo" }, // DUMMY
  { value: "100%", label: "Founder-led work" }, // DUMMY
  { value: "<24h", label: "Reply time" }, // DUMMY
];

export const techStack: string[] = [
  "Next.js",
  "React",
  "React Native",
  "TypeScript",
  "OpenAI",
  "n8n",
  "Supabase",
  "Vercel",
];

export type VisualDevice = "browser" | "flow" | "phone";

export type WorkItem = {
  title: string;
  category: string;
  meta: string;
  year: string;
  /** Short line rendered inside the generated mockup. */
  tagline: string;
  device: VisualDevice;
  tint: "violet" | "cyan";
  /** Headline outcome shown on the card. */
  result: { value: string; label: string };
};

export const work: WorkItem[] = [
  {
    title: "Aurora Payouts",
    category: "Web application",
    meta: "An API-driven payout dashboard for a fintech — batch runs, live reconciliation, role-based access.",
    year: "2026",
    tagline: "Payouts, reconciled in real time.",
    device: "browser",
    tint: "violet",
    result: { value: "−73%", label: "manual reconciliation" }, // DUMMY
  },
  {
    title: "LumaOps",
    category: "AI automation",
    meta: "An AI ops layer over support + CRM: ticket triage, reminders and Slack reports on autopilot.",
    year: "2025",
    tagline: "Support that runs itself.",
    device: "flow",
    tint: "cyan",
    result: { value: "2,400+", label: "tickets triaged / mo" }, // DUMMY
  },
  {
    title: "PocketKiosk",
    category: "Mobile app",
    meta: "A React Native companion for retail kiosks — offline-first sync, push notifications, store-ready.",
    year: "2025",
    tagline: "Retail, in your pocket.",
    device: "phone",
    tint: "violet",
    result: { value: "4.9★", label: "App Store rating" }, // DUMMY
  },
];
