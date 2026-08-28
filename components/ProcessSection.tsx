"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const LINE_HEIGHT = 120;
const LINE_INSET = 24;
const CORNER = 8;
const STEP_START = 130;
const STEP_CHAIN_NUDGE = 12;

const SECTION_MAX = 1440;
const RIGHT_INSET = 50;
const LEFT_INSET = 40;

const LINE_DRAW_MS = 900;
const STEP_REVEAL_MS = 500;

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
const CONNECTOR_COUNT = steps.length - 1;

function buildPath(svgH: number, svgW: number) {
  const vertEnd = svgH - CORNER;
  return `M0.5 0V${vertEnd}C0.5 ${vertEnd + CORNER * 0.55} ${CORNER * 0.45} ${svgH} ${CORNER} ${svgH}H${svgW}`;
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [linesDrawn, setLinesDrawn] = useState(0);
  const [drawingLine, setDrawingLine] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const animateLine = useCallback(
    (index: number) =>
      new Promise<void>((resolve) => {
        const path = pathRefs.current[index];
        if (!path) {
          resolve();
          return;
        }

        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        const anim = path.animate(
          [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
          {
            duration: LINE_DRAW_MS,
            easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            fill: "forwards",
          },
        );

        anim.onfinish = () => {
          path.style.strokeDasharray = "none";
          path.style.strokeDashoffset = "0";
          resolve();
        };
      }),
    [],
  );

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        if (reduceMotion) {
          setRevealedSteps(steps.length);
          setLinesDrawn(CONNECTOR_COUNT);
          return;
        }

        void (async () => {
          setRevealedSteps(1);

          for (let i = 0; i < CONNECTOR_COUNT; i++) {
            setDrawingLine(i);
            await animateLine(i);
            setLinesDrawn(i + 1);
            setRevealedSteps(i + 2);
          }

          setDrawingLine(null);
        })();
      },
      { threshold: 0.25 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [animateLine, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full shrink-0 overflow-hidden bg-forest px-4 py-12 md:h-[846px] md:px-0 md:py-0"
    >
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

      <div className="relative z-10 mx-auto max-w-[1440px] md:hidden">
        <h2 className="mb-8 max-w-[352px] font-display text-[32px] leading-[1.2] uppercase text-white sm:text-[40px]">
          We handle all the complexity
        </h2>

        <div className="flex flex-col gap-10">
          {steps.map((step, i) => {
            const isRevealed = revealedSteps > i;

            return (
              <div
                key={step.number}
                className="border-l border-white/20 pl-4 transition-[opacity,transform] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(10px)",
                  transitionDuration: `${STEP_REVEAL_MS}ms`,
                }}
              >
                <p className="mb-3 font-[family-name:var(--font-instrument)] text-lg font-medium text-white/60">
                  {step.number}
                </p>
                <div className="flex flex-col gap-2 leading-[1.2]">
                  <p className="font-[family-name:var(--font-instrument)] text-lg font-medium text-white">
                    {step.title}
                  </p>
                  <p className="font-[family-name:var(--font-instrument)] text-base text-white/80">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute inset-x-0 top-[114px] mx-auto hidden h-[618px] max-w-[1440px] md:block"
        style={{ paddingLeft: LEFT_INSET, paddingRight: RIGHT_INSET }}
      >
        <div className="relative h-full" style={{ width: CONTENT_WIDTH }}>
          <h2 className="absolute left-0 top-[-30px] w-[352px] font-display text-[48px] leading-[1.2] uppercase text-white">
            We handle all the complexity
          </h2>

          {steps.map((step, i) => {
            const top =
              STEP_START + i * (LINE_INSET + LINE_HEIGHT - STEP_CHAIN_NUDGE);
            const hasNext = i < steps.length - 1;
            const svgTop = top + LINE_INSET;
            const svgH = LINE_HEIGHT;
            const svgW = step.rail + CORNER;
            const svgLeft = step.numberLeft + 5;
            const isRevealed = revealedSteps > i;
            const lineVisible =
              reduceMotion || linesDrawn > i || drawingLine === i;

            return (
              <div key={step.number}>
                <p
                  className="absolute font-[family-name:var(--font-instrument)] text-xl font-medium leading-[1.2] text-white transition-[opacity,transform] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    left: step.numberLeft,
                    top,
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(8px)",
                    transitionDuration: `${STEP_REVEAL_MS}ms`,
                  }}
                >
                  {step.number}
                </p>

                <div
                  className="absolute flex w-[319px] flex-col gap-3 leading-[1.2] transition-[opacity,transform] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    left: step.textLeft,
                    top,
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(10px)",
                    transitionDuration: `${STEP_REVEAL_MS}ms`,
                  }}
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
                      ref={(el) => {
                        pathRefs.current[i] = el;
                      }}
                      d={buildPath(svgH, svgW)}
                      stroke="white"
                      strokeOpacity={lineVisible ? 0.4 : 0}
                      strokeWidth={1}
                      fill="none"
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
