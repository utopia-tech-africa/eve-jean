"use client";

import { useEffect, useState } from "react";
import { dispatchLoaderComplete } from "@/lib/loader";

const MIN_DURATION_MS = 2200;
const EXIT_MS = 2600;
const LOGO_REVEAL_MS = 900;
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const EXIT_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setVisible(false);
      dispatchLoaderComplete();
      return;
    }

    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => setLogoVisible(true));

    let targetProgress = 8;
    let currentProgress = 0;
    let rafId = 0;
    let exitTimeout: ReturnType<typeof setTimeout> | undefined;
    const startedAt = performance.now();

    const handleLoad = () => {
      targetProgress = Math.max(targetProgress, 100);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    void document.fonts.ready.then(() => {
      targetProgress = Math.max(targetProgress, 72);
    });

    const finish = () => {
      setExiting(true);
      exitTimeout = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        dispatchLoaderComplete();
      }, EXIT_MS);
    };

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const timeProgress = Math.min(92, (elapsed / MIN_DURATION_MS) * 92);
      targetProgress = Math.max(targetProgress, timeProgress);

      currentProgress += (targetProgress - currentProgress) * 0.09;
      if (Math.abs(targetProgress - currentProgress) < 0.4) {
        currentProgress = targetProgress;
      }

      setProgress(Math.min(100, Math.round(currentProgress)));

      if (currentProgress >= 99.5 && elapsed >= MIN_DURATION_MS) {
        setProgress(100);
        finish();
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", handleLoad);
      clearTimeout(exitTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-accent will-change-transform"
      style={{
        transform: exiting ? "translateX(-100%)" : "translateX(0)",
        transitionProperty: "transform",
        transitionDuration: `${EXIT_MS}ms`,
        transitionTimingFunction: EXIT_EASE,
        pointerEvents: exiting ? "none" : "auto",
      }}
      aria-hidden={exiting}
      aria-busy={!exiting}
      aria-label="Loading site"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className="relative mx-4 h-[140px] w-[200px] shrink-0 scale-[0.85] sm:scale-100 md:mx-0 md:h-[181px] md:w-[262px]"
        style={{
          opacity: logoVisible ? 1 : 0,
          filter: logoVisible ? "blur(0px)" : "blur(24px)",
          transitionProperty: "opacity, filter",
          transitionDuration: `${LOGO_REVEAL_MS}ms`,
          transitionTimingFunction: EASE,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/loader/mark-frame.svg"
          alt=""
          className="absolute left-0 top-0 h-[181px] w-[113px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/loader/mark-detail.svg"
          alt=""
          className="absolute left-[20px] top-[37px] h-[123px] w-[73px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/loader/evejean.svg"
          alt=""
          className="absolute left-[130px] top-[60px] h-[16px] w-[91px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/loader/interiors.svg"
          alt=""
          className="absolute left-[130px] top-[92px] h-[19px] w-[132px]"
        />
      </div>

      <p
        className="absolute bottom-6 right-4 font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,142px)] leading-none text-[#dad2c9] tabular-nums md:bottom-[1.5%] md:right-[2.3%]"
        aria-live="polite"
      >
        {progress}%
      </p>
    </div>
  );
}
