"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ReachOutButton } from "./ReachOutButton";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const REVEAL_MS = 900;
const LOGO_STROKE = 0.5;

const logoPaths = [
  "M16.8946 26.0469C16.7664 26.1093 16.6901 26.2514 16.7179 26.39C16.7421 26.5182 16.8461 26.6326 16.9847 26.6569C19.7329 26.6499 22.481 26.6465 25.2292 26.6395C25.1738 33.5186 25.1218 40.3977 25.0663 47.2802C24.8757 49.3214 24.2589 52.3399 21.9647 54.3673C18.8492 57.1189 14.3856 56.4986 14.396 56.8139C14.4098 57.1327 19.7329 58.5224 24.0405 55.8089C28.3725 53.0712 28.9824 47.8832 29.0725 47.0169V30.6699C29.0725 30.1744 29.1487 29.3842 29.5819 28.556C30.282 27.2321 31.6335 26.2895 33.3143 26.0573C27.8388 26.0539 22.3667 26.0504 16.8911 26.0435L16.8946 26.0469Z",
  "M25.9709 18.3707L25.9189 18.0761C25.8045 17.286 25.652 16.5478 25.4476 15.872C25.2327 15.1962 24.8861 14.6348 24.3906 14.2016C23.895 13.7684 23.1291 13.5536 22.1103 13.5536H13.8415C13.3841 13.5536 12.9994 13.5778 12.6805 13.6298C12.3756 13.6818 12.133 13.8066 11.9666 14.011C11.8003 14.2155 11.7241 14.5447 11.7241 15.0056V26.026H15.8515C15.9797 26.1161 16.056 26.1785 16.0421 26.331C16.0282 26.5493 15.8515 26.5736 15.8376 26.5874H11.7241V37.5801C11.7241 38.0376 11.8003 38.3703 11.9666 38.5747C12.133 38.7792 12.3617 38.9074 12.6805 38.9559C12.9855 39.0079 13.3702 39.0322 13.8138 39.0322H18.5408C19.5596 39.0322 20.3255 38.8138 20.8211 38.3841C21.3167 37.9544 21.6736 37.3895 21.8781 36.7137C22.0825 36.038 22.2489 35.2998 22.3494 34.5097L22.4014 34.2151H22.6682L21.8781 39.299H7.26392V39.0322C7.74909 39.0322 8.15455 39.0079 8.47338 38.9698C8.80607 38.9317 9.05906 38.8034 9.22541 38.6128C9.40215 38.4084 9.48186 38.0792 9.48186 37.594V15.0195C9.48186 14.5482 9.39175 14.2155 9.22541 14.0145C9.04867 13.81 8.80607 13.6818 8.47338 13.6437C8.14069 13.6056 7.73523 13.5813 7.26392 13.5813V13.3145H25.4302L26.2204 18.3984H25.9535L25.9674 18.3741L25.9709 18.3707Z",
  "M1.36547 38.3842V30.4481C1.36547 29.9525 1.42784 29.8 1.67043 29.8C1.91301 29.8 2.01352 29.9768 2.01352 30.4481V45.6341C2.01352 46.9475 2.20412 48.2471 2.48483 49.5328C2.82792 51.075 3.37547 52.5409 4.08937 53.9548C4.80327 55.3826 5.70778 56.6822 6.76476 57.8674C7.8876 59.1288 9.14559 60.2378 10.5491 61.1666C12.9057 62.7226 15.491 63.7034 18.2842 64.1088C19.3793 64.2613 20.4883 64.3375 21.5972 64.2994C24.0578 64.1989 26.4143 63.6895 28.6565 62.681C30.2749 61.9533 31.7651 61.0245 33.1271 59.8913C34.6554 58.6159 35.955 57.1396 37.0119 55.4588C38.0308 53.8543 38.7967 52.1458 39.2784 50.3125C39.7359 48.5936 39.9403 46.847 39.9265 45.0622C39.9022 42.0923 39.9265 39.1396 39.9265 36.1697C39.9265 35.7226 39.9784 35.279 39.9646 34.832C39.8745 29.4569 39.9646 24.0923 39.9126 18.7138C39.9126 17.785 39.7462 16.8667 39.5799 15.9622C39.2611 14.3056 38.7135 12.7392 37.9754 11.2352C37.3134 9.91133 36.5094 8.67414 35.5564 7.54091C34.2811 6.01261 32.8048 4.71304 31.124 3.64219C29.2388 2.44311 27.2114 1.60446 25.0212 1.11928C23.9261 0.876694 22.8032 0.748461 21.6839 0.699944C18.8803 0.571719 16.1945 1.08116 13.6057 2.16587C11.6581 2.98027 9.88721 4.1135 8.30693 5.5309C6.5603 7.11118 5.13596 8.93405 4.06511 11.0203C3.09823 12.9056 2.46058 14.9052 2.16601 17.0087C2.05164 17.7989 1.98926 18.589 1.98926 19.3896V23.1081C1.95114 23.2606 1.85064 23.3645 1.68429 23.3749C1.51795 23.3749 1.40359 23.3126 1.3516 23.1566C1.32734 23.0665 1.31348 22.966 1.31348 22.862V19.7153C1.32734 17.6013 1.61845 15.5359 2.29423 13.5224C3.06011 11.2178 4.20373 9.1004 5.7459 7.22901C7.28806 5.34376 9.11093 3.78774 11.2249 2.57827C13.3008 1.39306 15.5326 0.616772 17.8995 0.235564C19.2892 0.0172352 20.6893 -0.0451432 22.079 0.0310986C24.3454 0.145461 26.5252 0.654893 28.6149 1.54554C30.2334 2.23518 31.7235 3.11195 33.0994 4.19667C34.6935 5.45812 36.0693 6.91019 37.2025 8.59097C38.412 10.3619 39.2923 12.2991 39.8779 14.3507C40.2106 15.522 40.4255 16.7211 40.5156 17.9306C40.5918 18.8351 40.6057 19.7396 40.6057 20.6441V44.8508C40.6057 46.5975 40.4671 48.3164 40.0443 49.9972C39.7636 51.1581 39.3824 52.2775 38.8972 53.3622C38.2491 54.8143 37.4313 56.1762 36.4505 57.4273C34.8079 59.517 32.8325 61.2255 30.5002 62.5251C28.7051 63.5197 26.8059 64.2197 24.7925 64.6287C23.1221 64.9717 21.4274 65.0618 19.7363 64.9613C17.0227 64.8088 14.4375 64.0811 12.015 62.8474C10.5249 62.0815 9.14905 61.1389 7.90146 60.0056C6.88259 59.0873 5.95383 58.0961 5.14982 56.9733C4.18294 55.6217 3.35468 54.1974 2.74129 52.6552C2.25611 51.4457 1.89915 50.2086 1.66003 48.9367C1.46943 47.9178 1.34121 46.8851 1.35507 45.842V38.4154L1.36893 38.3911L1.36547 38.3842Z",
  "M1.69117 28.2439C2.62518 28.2439 3.38235 27.4868 3.38235 26.5528C3.38235 25.6187 2.62518 24.8616 1.69117 24.8616C0.757158 24.8616 0 25.6187 0 26.5528C0 27.4868 0.757158 28.2439 1.69117 28.2439Z",
] as const;

function revealStyle(visible: boolean, delayMs = 0): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    filter: visible ? "blur(0px)" : "blur(14px)",
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transitionProperty: "opacity, filter, transform",
    transitionDuration: `${REVEAL_MS}ms`,
    transitionTimingFunction: EASE,
    transitionDelay: visible ? `${delayMs}ms` : "0ms",
  };
}

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [contentVisible, setContentVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const animateLogo = useCallback(async () => {
    const paths = pathRefs.current.filter(
      (path): path is SVGPathElement => path !== null,
    );
    const lengths = paths.map((path) => path.getTotalLength());
    const total = lengths.reduce((sum, n) => sum + n, 0);

    let delay = 0;

    await Promise.all(
      paths.map((path, i) => {
        const length = lengths[i];
        const duration = Math.max(320, (length / total) * 1800);
        const pathDelay = delay;
        delay += duration * 0.45;

        path.style.fill = "#2A381E";
        path.style.fillOpacity = "0";
        path.style.stroke = "#2A381E";
        path.style.strokeWidth = `${LOGO_STROKE}`;
        path.style.strokeLinecap = "round";
        path.style.strokeLinejoin = "round";
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        return new Promise<void>((resolve) => {
          const anim = path.animate(
            [
              { strokeDashoffset: length, fillOpacity: 0 },
              { strokeDashoffset: 0, fillOpacity: 0, offset: 0.72 },
              { strokeDashoffset: 0, fillOpacity: 1 },
            ],
            {
              duration,
              delay: pathDelay,
              easing: EASE,
              fill: "forwards",
            },
          );
          anim.onfinish = () => {
            path.style.stroke = "none";
            resolve();
          };
        });
      }),
    );
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        if (reduceMotion) {
          pathRefs.current.forEach((path) => {
            if (!path) return;
            path.style.fill = "#2A381E";
            path.style.fillOpacity = "1";
          });
          setContentVisible(true);
          return;
        }

        void animateLogo();
        setContentVisible(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [animateLogo, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-4 flex min-h-[360px] w-auto max-w-[1392px] shrink-0 flex-col items-center justify-center gap-6 overflow-hidden rounded-lg px-4 py-10 md:mx-auto md:h-[316px] md:w-full md:gap-0 md:px-0 md:py-0"
    >
      <Image
        src="/images/cta-bg.png"
        alt=""
        fill
        className="object-cover opacity-80"
        sizes="(max-width: 768px) 100vw, 1392px"
      />
      <div className="absolute inset-0 rounded-lg bg-black/5" aria-hidden />

      <div className="relative z-10 flex shrink-0 items-start justify-center md:absolute md:left-1/2 md:top-8 md:-translate-x-1/2">
        <svg
          width="41"
          height="65"
          viewBox="0 0 41 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[52px] w-[33px] md:h-[65px] md:w-[41px]"
          aria-hidden
        >
          {logoPaths.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={d}
              fill={reduceMotion ? "#2A381E" : "transparent"}
            />
          ))}
        </svg>
      </div>

      <h2
        className="relative z-10 max-w-[754px] text-center font-display text-[28px] leading-[1.2] uppercase text-accent sm:text-[36px] md:absolute md:left-1/2 md:top-[116px] md:w-[754px] md:-translate-x-1/2 md:text-[48px]"
        style={revealStyle(contentVisible || reduceMotion)}
      >
        Every room begins with a single idea. Let&apos;s find yours
      </h2>

      <div
        className="relative z-10 md:absolute md:left-1/2 md:top-[246px] md:-translate-x-1/2"
        style={revealStyle(contentVisible || reduceMotion, 120)}
      >
        <ReachOutButton variant="cta" />
      </div>
    </section>
  );
}
