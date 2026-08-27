"use client";

import Image from "next/image";

const LINE_HEIGHT = 120;
const LINE_INSET = 24;
const CORNER = 8;
const STEP_START = 130;
/** Pull each chained step up so its number sits on the previous rail. */
const STEP_CHAIN_NUDGE = 12;

const SECTION_MAX = 1440;
const RIGHT_INSET = 50;
const LEFT_INSET = 40;

const steps = [
  {
    number: "1",
    title: "Smarter design, better outcomes",
    body: "We evaluate materials and methods early to maximise value and cut unnecessary cost.",
    numberLeft: 112,
    textLeft: 141,
    rail: 248,
  },
  {
    number: "2",
    title: "From concept to precision",
    body: "Ideas become drawings and plans, evolving from concepts to designs, bringing visions to life.",
    numberLeft: 376,
    textLeft: 406,
    rail: 294,
  },
  {
    number: "3",
    title: "The right partners",
    body: "We choose and manage the best makers and contractors for each project.",
    numberLeft: 686,
    textLeft: 712,
    rail: 294,
  },
  {
    number: "4",
    title: "Full turnkey delivery",
    body: "We manage sourcing, production, and installation. Every step is handled from start to finish. Your project is in good hands with us.",
    numberLeft: 996,
    textLeft: 1021,
    rail: 0,
  },
] as const;

const CONTENT_WIDTH = SECTION_MAX - LEFT_INSET - RIGHT_INSET;

export function ProcessSection() {
  return (
    <section className="relative h-[846px] w-full shrink-0 overflow-hidden bg-forest">
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        aria-hidden
      >
        <Image
          src="/images/satin-texture.png"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="1440px"
        />
      </div>

      <div
        className="absolute inset-x-0 top-[114px] mx-auto h-[618px] max-w-[1440px]"
        style={{ paddingLeft: LEFT_INSET, paddingRight: RIGHT_INSET }}
      >
        <div className="relative h-full" style={{ width: CONTENT_WIDTH }}>
          <h2 className="absolute left-0 top-[-30px] w-[352px] font-display text-[48px] leading-[1.2] uppercase text-white">
            We handle all the complexity
          </h2>

          {steps.map((step, i) => {
          // Each step starts where the previous connector ends.
          const top =
            STEP_START + i * (LINE_INSET + LINE_HEIGHT - STEP_CHAIN_NUDGE);
          const hasNext = i < steps.length - 1;
          const svgTop = top + LINE_INSET;
          const svgH = LINE_HEIGHT;
          const vertEnd = svgH - CORNER;
          const svgW = step.rail + CORNER;
          const svgLeft = step.numberLeft + 5;

          return (
            <div key={step.number}>
              <p
                className="absolute font-[family-name:var(--font-instrument)] text-xl font-medium leading-[1.2] text-white"
                style={{ left: step.numberLeft, top }}
              >
                {step.number}
              </p>

              <div
                className="absolute flex w-[319px] flex-col gap-3 leading-[1.2]"
                style={{ left: step.textLeft, top }}
              >
                <p className="font-[family-name:var(--font-instrument)] text-xl font-medium text-white">
                  {step.title}
                </p>
                <p className="font-[family-name:var(--font-instrument)] text-lg text-white/80">
                  {step.body}
                </p>
              </div>

              {hasNext ? (
                <svg
                  className="pointer-events-none absolute overflow-visible"
                  style={{ left: svgLeft, top: svgTop }}
                  width={svgW}
                  height={svgH}
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  fill="none"
                  aria-hidden
                >
                  <path
                    d={`M0.5 0V${vertEnd}C0.5 ${vertEnd + CORNER * 0.55} ${CORNER * 0.45} ${svgH} ${CORNER} ${svgH}H${svgW}`}
                    stroke="white"
                    strokeOpacity="0.4"
                  />
                </svg>
              ) : null}
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
