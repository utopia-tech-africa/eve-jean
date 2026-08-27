"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealMediaProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function RevealMedia({
  children,
  className = "",
  delayMs = 0,
}: RevealMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const style: CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        filter: visible ? "blur(0px)" : "blur(14px)",
        transitionProperty: "opacity, transform, filter",
        transitionDuration: "1.15s",
        transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        transitionDelay: visible ? `${delayMs}ms` : "0ms",
        willChange: visible ? "auto" : "opacity, transform, filter",
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
