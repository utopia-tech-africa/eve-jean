"use client";

import Snap from "lenis/snap";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

function LenisSnapSetup() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const snap = new Snap(lenis, {
      type: "mandatory",
      debounce: 200,
    });

    const sections = document.querySelectorAll("[data-snap-section]");
    const removeFns = Array.from(sections).map((section) =>
      snap.addElement(section as HTMLElement, { align: "start" }),
    );

    return () => {
      removeFns.forEach((remove) => remove());
      snap.destroy();
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        lerp: 0.06,
        smoothWheel: true,
      }}
    >
      <LenisSnapSetup />
      {children}
    </ReactLenis>
  );
}
