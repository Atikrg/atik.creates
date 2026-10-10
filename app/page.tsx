import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { Process } from "@/components/process";
import { Cta } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";
import { CursorGlow } from "@/components/cursor-glow";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <Work />
        <Process />
        <Cta />
      </main>
      <SiteFooter />
      <CursorGlow />
      <div className="grain" aria-hidden="true" />
    </>
  );
}