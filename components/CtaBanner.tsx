import Image from "next/image";
import { ReachOutButton } from "./ReachOutButton";

export function CtaBanner() {
  return (
    <section className="relative mx-auto h-[316px] w-[1392px] shrink-0 overflow-hidden rounded-lg">
      <Image
        src="/images/cta-bg.png"
        alt=""
        fill
        className="object-cover opacity-80"
        sizes="1392px"
      />
      <div className="absolute inset-0 rounded-lg bg-black/5" aria-hidden />

      <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-start justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/cta-monogram-b.svg"
          alt=""
          className="h-[65px] w-[41px]"
        />
      </div>

      <h2 className="absolute left-1/2 top-[116px] w-[754px] -translate-x-1/2 text-center font-[family-name:var(--font-display)] text-[48px] leading-[1.2] uppercase text-accent">
        Every room begins with a single idea. Let&apos;s find yours
      </h2>

      <div className="absolute left-1/2 top-[246px] -translate-x-1/2">
        <ReachOutButton variant="filled" />
      </div>
    </section>
  );
}
