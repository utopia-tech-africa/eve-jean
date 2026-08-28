"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { useLoaderComplete } from "@/hooks/useLoaderComplete";
import { ReachOutButton } from "./ReachOutButton";

const links = ["Services", "Work", "About"] as const;

const navText =
  "font-[family-name:var(--font-instrument)] text-base font-normal leading-normal text-white md:text-[18px]";

const NAV_INTRO_MS = 1400;
const NAV_INTRO_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function SiteNav() {
  const lenis = useLenis();
  const loaderComplete = useLoaderComplete();
  const [scrollHidden, setScrollHidden] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const [motionMode, setMotionMode] = useState<"intro" | "scroll">("intro");
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = lenis?.animatedScroll ?? window.scrollY;

    lenis?.stop();

    const { style: bodyStyle } = document.body;
    const { style: htmlStyle } = document.documentElement;

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.left = "0";
    bodyStyle.right = "0";
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    htmlStyle.overflow = "hidden";

    return () => {
      bodyStyle.position = "";
      bodyStyle.top = "";
      bodyStyle.left = "";
      bodyStyle.right = "";
      bodyStyle.width = "";
      bodyStyle.overflow = "";
      htmlStyle.overflow = "";

      lenis?.start();
      if (lenis) {
        lenis.scrollTo(scrollY, { immediate: true });
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [menuOpen, lenis]);

  const hidden = !loaderComplete || scrollHidden;

  return (
    <>
      <nav
        className="fixed left-1/2 top-[10px] z-50 w-full max-w-[687px] px-4 will-change-transform md:px-0"
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
        <div className="flex w-full items-center justify-between overflow-hidden rounded bg-[rgba(21,21,21,0.6)] px-3 py-2 backdrop-blur-[5px] md:px-4">
          <p className={`shrink-0 whitespace-nowrap ${navText}`}>EVEJEAN</p>

          <div className={`hidden shrink-0 items-center gap-4 md:flex ${navText}`}>
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

          <div className="flex shrink-0 items-center gap-2 md:gap-0">
            <ReachOutButton variant="outline" className="hidden md:block" />
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex size-9 items-center justify-center rounded text-white md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-white transition-transform duration-200 ease-out ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-px w-full bg-white transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-200 ease-out ${
                    menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-forest/95 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
          {links.map((label) => (
            <button
              key={label}
              type="button"
              aria-disabled="true"
              className="font-display text-3xl uppercase text-white"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </button>
          ))}
          <ReachOutButton variant="outline" />
        </div>
      </div>
    </>
  );
}
