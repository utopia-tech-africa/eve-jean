"use client";

import Image from "next/image";
import { useLoaderComplete } from "@/hooks/useLoaderComplete";

export function Hero() {
  const loaderComplete = useLoaderComplete();

  return (
    <section className="relative flex h-[100vh] w-full shrink-0 flex-col px-6 pb-6 pt-[10px]">
      {/* Matches fixed nav height so the image sits 16px below it */}
      <div className="h-14 shrink-0" aria-hidden />

      <div className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-lg">
        <div
          className={`absolute inset-0 origin-center will-change-transform transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaderComplete ? "scale-[1.03]" : "scale-100"
          }`}
        >
          <Image
            src="/images/hero.png"
            alt="Bright modern kitchen and living interior"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1440px) 100vw, 1392px"
          />
        </div>
        <div className="absolute inset-0 rounded-lg bg-black/30" aria-hidden />

        <h1
          className={`absolute bottom-5 left-5 font-display text-[52px] leading-[1.2] uppercase text-white ${
            loaderComplete ? "animate-rise-in" : "translate-y-4 opacity-0"
          }`}
        >
          Interiors shaped by <br />how you actually live
        </h1>

        <p
          className={`absolute bottom-5 right-5 w-[321px] text-right font-[family-name:var(--font-instrument)] text-xl leading-[1.2] text-white ${
            loaderComplete ? "animate-rise-in-delay" : "translate-y-4 opacity-0"
          }`}
        >
          A design studio crafting considered interiors for homes, hospitality,
          and workplaces
        </p>
      </div>
    </section>
  );
}
