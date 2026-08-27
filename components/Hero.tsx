import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex h-[100vh] w-full shrink-0 flex-col px-6 pb-6 pt-[10px]">
      {/* Matches fixed nav height so the image sits 16px below it */}
      <div className="h-14 shrink-0" aria-hidden />

      <div className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-lg">
        <Image
          src="/images/hero.png"
          alt="Bright modern kitchen and living interior"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1440px) 100vw, 1392px"
        />
        <div className="absolute inset-0 rounded-lg bg-black/30" aria-hidden />

        <h1 className="animate-rise-in absolute bottom-5 left-5 font-display text-[52px] leading-[1.2] uppercase text-white">
          Interiors shaped by <br />how you actually live
        </h1>

        <p className="animate-rise-in-delay absolute bottom-5 right-5 w-[321px] text-right font-[family-name:var(--font-instrument)] text-xl leading-[1.2] text-white">
          A design studio crafting considered interiors for homes, hospitality,
          and workplaces
        </p>
      </div>
    </section>
  );
}
