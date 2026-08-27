import Image from "next/image";
import { RevealMedia } from "@/components/RevealMedia";
import { Signature } from "@/components/Signature";

export function AboutSection() {
  return (
    <section className="relative flex h-[800px] w-full shrink-0 items-center justify-center bg-cream">
      <div className="relative h-[663px] w-full max-w-[1340px]">
        <RevealMedia className="absolute left-0 top-0 h-[521px] w-[357px] overflow-hidden rounded">
          <Image
            src="/images/about-portrait.png"
            alt="Eve Jean in a kitchen"
            fill
            className="object-cover"
            sizes="357px"
          />
        </RevealMedia>

        <RevealMedia
          className="absolute left-[983px] top-[142px] h-[521px] w-[357px] overflow-hidden rounded"
          delayMs={160}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="https://res.cloudinary.com/ddhcj9o9h/video/upload/v1787848645/HighPoint_2026_Spring_Reel_by_Bricc_Agency_1_x8rixp.mp4"
            poster="/images/about-room.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Living room interior by Eve Jean"
          />
        </RevealMedia>

        <div className="absolute left-1/2 top-1/2 flex w-[563px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center leading-[1.2]">
          <h2 className="font-display text-[32px] uppercase text-ink">
            Every space begins as an idea. Craft is what makes it feel true.
          </h2>
          <p className="font-[family-name:var(--font-instrument)] text-lg text-[rgba(21,21,21,0.8)]">
            We work with artisans and makers who know their materials inside out
            — turning considered design into pieces that are actually built to
            last. Small material tiles: Wood, Stone, Textile, Metal — each with
            a one-line origin/maker note.
          </p>
        </div>

        <div className="absolute left-[549px] top-[441px] flex w-[242px] flex-col items-center">
          <Signature />
          <p className="mt-1 text-center font-[family-name:var(--font-instrument)] text-lg leading-[1.2] text-[rgba(21,21,21,0.8)]">
            Founder & Creative Director
          </p>
        </div>
      </div>
    </section>
  );
}
