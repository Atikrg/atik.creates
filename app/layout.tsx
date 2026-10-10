import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsDetector } from "@/components/js-detector";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

// Expressive serif italic used as the accent voice (e.g. "founder-led").
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inst",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI automation",
    "AI agents",
    "web application development",
    "mobile app development",
    "React Native",
    "Next.js",
    "workflow automation",
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#07070b",
};

// Runs synchronously in <head> before paint: applies the saved theme (or the
// system preference) so there's no flash of the wrong theme. See
// node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var t=(s==="light"||s==="dark")?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} no-js h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Removes the .no-js marker in layout (pre-paint) — see JsDetector */}
        <JsDetector />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
