import { AboutSection } from "@/components/AboutSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Hero } from "@/components/Hero";
import { ProcessSection } from "@/components/ProcessSection";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  return (
    <main className="mx-auto flex w-[1440px] flex-col items-center gap-8 bg-cream">
      <Hero />
      <WorkSection />
      <AboutSection />
      <ProcessSection />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
