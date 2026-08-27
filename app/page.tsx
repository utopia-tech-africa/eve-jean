import { AboutSection } from "@/components/AboutSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Hero } from "@/components/Hero";
import { ProcessSection } from "@/components/ProcessSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  return (
    <main className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 overflow-x-hidden bg-cream">
      <SiteNav />
      <Hero />
      <WorkSection />
      <AboutSection />
      <ProcessSection />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
