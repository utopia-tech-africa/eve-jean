"use client";

import { useEffect, useState } from "react";
import { ReachOutButton } from "./ReachOutButton";

const links = ["Services", "Work", "About"] as const;

const navText =
  "font-[family-name:var(--font-instrument)] text-[18px] font-normal leading-normal text-white";

export function SiteNav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const scrollingDown = y > lastY;
      setHidden(scrollingDown && y > 40);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-[10px] z-50 w-[687px] max-w-[calc(100%-2rem)] -translate-x-1/2 overflow-hidden rounded bg-[rgba(21,21,21,0.6)] px-4 py-2 backdrop-blur-[5px] transition-transform duration-300 ease-out will-change-transform ${
        hidden ? "-translate-y-[calc(100%+10px)]" : "translate-y-0"
      }`}
      aria-label="Primary"
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
