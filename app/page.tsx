import { AboutSection } from "@/components/AboutSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Hero } from "@/components/Hero";
import { ProcessSection } from "@/components/ProcessSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  return (
    <main className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center overflow-x-hidden bg-cream">
      <SiteNav />
      <div className="flex w-full flex-col gap-10 md:gap-20">
        <div data-snap-section className="w-full">
          <Hero />
        </div>
        <div data-snap-section className="w-full">
          <WorkSection />
        </div>
        <div data-snap-section className="w-full">
          <AboutSection />
        </div>
        <div data-snap-section className="w-full">
          <ProcessSection />
        </div>
        <div data-snap-section className="w-full">
          <CtaBanner />
        </div>
        <div data-snap-section className="w-full">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
