import Image from "next/image";

export function AboutSection() {
  return (
    <section className="relative h-[800px] w-full shrink-0 bg-cream">
      <div className="relative mx-auto h-[663px] w-[1340px]">
        <div className="absolute left-0 top-0 h-[521px] w-[357px] overflow-hidden rounded">
          <Image
            src="/images/about-portrait.png"
            alt="Eve Jean in a kitchen"
            fill
            className="object-cover"
            sizes="357px"
          />
        </div>

        <div className="absolute left-[983px] top-[142px] h-[521px] w-[357px] overflow-hidden rounded">
          <Image
            src="/images/about-room.png"
            alt="Living room interior by Eve Jean"
            fill
            className="object-cover"
            sizes="357px"
          />
        </div>

        <div className="absolute left-1/2 top-1/2 flex w-[563px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center leading-[1.2]">
          <h2 className="font-[family-name:var(--font-display)] text-[32px] uppercase text-ink">
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/signature.svg"
            alt="Eve Jean signature"
            className="h-auto w-[242px]"
          />
          <p className="mt-1 text-center font-[family-name:var(--font-instrument)] text-lg leading-[1.2] text-[rgba(21,21,21,0.8)]">
            Founder & Creative Director
          </p>
        </div>
      </div>
    </section>
  );
}
