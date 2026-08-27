"use client";

import { useEffect, useRef } from "react";

export function Signature({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    const animations: Animation[] = [];

    const play = (svg: SVGSVGElement) => {
      if (playedRef.current) return;
      playedRef.current = true;

      svg.style.display = "block";
      svg.style.width = "242px";
      svg.style.height = "auto";

      // DOM order is right-to-left; reverse so it writes Eve → Jean.
      const paths = [...svg.querySelectorAll("path")].reverse();
      const lengths = paths.map((path) => path.getTotalLength());
      const total = lengths.reduce((sum, n) => sum + n, 0);

      if (reduceMotion) {
        paths.forEach((path) => {
          path.style.fill = "#2A381E";
          path.style.fillOpacity = "1";
          path.style.stroke = "none";
        });
        return;
      }

      let delay = 0;

      paths.forEach((path, i) => {
        const length = lengths[i];
        const duration = Math.max(280, (length / total) * 2400);

        path.style.fill = "#2A381E";
        path.style.fillOpacity = "0";
        path.style.stroke = "#2A381E";
        path.style.strokeWidth = "0.5";
        path.style.strokeLinecap = "round";
        path.style.strokeLinejoin = "round";
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        animations.push(
          path.animate(
            [
              { strokeDashoffset: length, fillOpacity: 0 },
              { strokeDashoffset: 0, fillOpacity: 0, offset: 0.72 },
              { strokeDashoffset: 0, fillOpacity: 1 },
            ],
            {
              duration,
              delay,
              easing: "cubic-bezier(0.23, 1, 0.32, 1)",
              fill: "forwards",
            },
          ),
        );

        delay += duration * 0.55;
      });
    };

    void fetch("/logos/signature.svg")
      .then((res) => res.text())
      .then((markup) => {
        if (cancelled || !container) return;
        container.innerHTML = markup;
        const svg = container.querySelector("svg");
        if (!svg) return;

        observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            play(svg);
            observer?.disconnect();
          },
          { threshold: 0.4 },
        );
        observer.observe(container);
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: 242, height: 100 }}
      role="img"
      aria-label="Eve Jean signature"
    />
  );
}
