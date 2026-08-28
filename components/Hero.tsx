"use client";

import Image from "next/image";
import { useLoaderComplete } from "@/hooks/useLoaderComplete";

export function Hero() {
  const loaderComplete = useLoaderComplete();

  return (
    <section className="relative flex min-h-[100dvh] w-full shrink-0 flex-col px-4 pb-4 pt-[10px] md:px-6 md:pb-6">
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
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1392px"
          />
        </div>
        <div className="absolute inset-0 rounded-lg bg-black/30" aria-hidden />

        <div className="absolute inset-x-0 bottom-4 flex flex-col gap-3 px-4 md:bottom-5 md:block md:px-0">
          <h1
            className={`font-display text-[32px] leading-[1.15] uppercase text-white sm:text-[40px] md:absolute md:bottom-5 md:left-5 md:max-w-[min(520px,70%)] md:text-[52px] md:leading-[1.2] ${
              loaderComplete ? "animate-rise-in" : "translate-y-4 opacity-0"
            }`}
          >
            Interiors shaped by <br className="hidden sm:block" />
            how you actually live
          </h1>

          <p
            className={`max-w-[320px] font-[family-name:var(--font-instrument)] text-base leading-[1.2] text-white sm:text-lg md:absolute md:bottom-5 md:right-5 md:w-[321px] md:text-right md:text-xl ${
              loaderComplete ? "animate-rise-in-delay" : "translate-y-4 opacity-0"
            }`}
          >
            A design studio crafting considered interiors for homes, hospitality,
            and workplaces
          </p>
        </div>
      </div>
    </section>
  );
}
