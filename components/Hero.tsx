import Image from "next/image";
import { SiteNav } from "./SiteNav";

export function Hero() {
  return (
    <section className="relative h-[831px] w-full shrink-0">
      <SiteNav />

      <div className="absolute left-6 top-[86px] h-[731px] w-[1392px] overflow-hidden rounded-lg">
        <Image
          src="/images/hero.png"
          alt="Bright modern kitchen and living interior"
          fill
          priority
          className="object-cover"
          sizes="1392px"
        />
        <div className="absolute inset-0 rounded-lg bg-black/30" aria-hidden />

        <p className="animate-rise-in-delay absolute bottom-8 right-5 w-[321px] text-right font-[family-name:var(--font-instrument)] text-xl leading-[1.2] text-white">
          A design studio crafting considered interiors for homes, hospitality,
          and workplaces
        </p>
      </div>

      <h1 className="animate-rise-in absolute left-[44px] top-[673px] w-[567px] font-[family-name:var(--font-display)] text-[52px] leading-[1.2] uppercase text-white">
        Interiors shaped by how you actually live
      </h1>
    </section>
  );
}
