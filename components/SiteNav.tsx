"use client";

import { useEffect, useState } from "react";
import { useLoaderComplete } from "@/hooks/useLoaderComplete";
import { ReachOutButton } from "./ReachOutButton";

const links = ["Services", "Work", "About"] as const;

const navText =
  "font-[family-name:var(--font-instrument)] text-[18px] font-normal leading-normal text-white";

const NAV_INTRO_MS = 1400;
const NAV_INTRO_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function SiteNav() {
  const loaderComplete = useLoaderComplete();
  const [scrollHidden, setScrollHidden] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const [motionMode, setMotionMode] = useState<"intro" | "scroll">("intro");

  useEffect(() => {
    if (!loaderComplete) return;
    setCanAnimate(true);
  }, [loaderComplete]);

  useEffect(() => {
    if (!loaderComplete) return;

    const timer = window.setTimeout(() => {
      setMotionMode("scroll");
    }, NAV_INTRO_MS);

    return () => window.clearTimeout(timer);
  }, [loaderComplete]);

  useEffect(() => {
    if (!loaderComplete) return;

    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const scrollingDown = y > lastY;
      setScrollHidden(scrollingDown && y > 40);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaderComplete]);

  const hidden = !loaderComplete || scrollHidden;

  return (
    <nav
      className="fixed left-1/2 top-[10px] z-50 w-[687px] max-w-[calc(100%-2rem)] overflow-hidden rounded bg-[rgba(21,21,21,0.6)] px-4 py-2 backdrop-blur-[5px] will-change-transform"
      style={{
        transform: hidden
          ? "translate(-50%, calc(-100% - 10px))"
          : "translate(-50%, 0)",
        transitionProperty: "transform",
        transitionDuration: canAnimate
          ? motionMode === "intro"
            ? `${NAV_INTRO_MS}ms`
            : "300ms"
          : "0ms",
        transitionTimingFunction:
          motionMode === "intro" ? NAV_INTRO_EASE : "ease-out",
      }}
      aria-label="Primary"
      aria-hidden={!loaderComplete}
    >
      <div className="flex w-full items-center justify-between">
        <p className={`shrink-0 whitespace-nowrap ${navText}`}>EVEJEAN</p>

        <div className={`flex shrink-0 items-center gap-4 ${navText}`}>
          {links.map((label) => (
            <button
              key={label}
              type="button"
              aria-disabled="true"
              className="cursor-default transition-opacity hover:opacity-80"
            >
              {label}
            </button>
          ))}
        </div>

        <ReachOutButton variant="outline" className="shrink-0" />
      </div>
    </nav>
  );
}
