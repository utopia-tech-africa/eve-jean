"use client";

import Image from "next/image";
import Lenis from "lenis";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const projects = [
  {
    name: "Ritz Carlton",
    src: "/images/work-1.png",
  },
  {
    name: "The Hue Hotel",
    src: "/images/work-2.png",
  },
  {
    name: "Oceanside Lotto",
    src: "/images/work-3.png",
  },
  {
    name: "Marlowe Residence",
    src: "/images/work-4.png",
  },
] as const;

const BASE_W = 357;
const BASE_H = 521;
const FOCUS_W = 507;
const FOCUS_H = 591;
const GAP = 32;
const ACTIVATION_WINDOW = 140;
const AUTOPLAY_STEP = 0.5;
const SIZE_LERP = 0.08;
const SET_COUNT = 3;
const BASE_SET_WIDTH =
  projects.length * BASE_W + projects.length * GAP;

type Size = { w: number; h: number };

function createSizes(count: number): Size[] {
  return Array.from({ length: count }, () => ({ w: BASE_W, h: BASE_H }));
}

export function WorkSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const sizesRef = useRef<Size[]>(createSizes(projects.length * SET_COUNT));
  const expandedRef = useRef<boolean[]>(
    Array.from({ length: projects.length * SET_COUNT }, () => false),
  );
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const wrappingRef = useRef(false);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const totalCards = projects.length * SET_COUNT;
  const setLen = projects.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
      if (media.matches) {
        setExpandedCards(
          expandedRef.current.flatMap((on, i) => (on ? [i] : [])),
        );
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      orientation: "horizontal",
      gestureOrientation: "horizontal",
      smoothWheel: false,
      syncTouch: false,
      virtualScroll: () => false,
      autoRaf: false,
      lerp: 1,
    });
    lenisRef.current = lenis;

    const contentLeftOf = (el: HTMLElement) =>
      el.getBoundingClientRect().left - content.getBoundingClientRect().left;

    const applyCardSize = (i: number) => {
      const size = sizesRef.current[i];
      const mediaEl = mediaRefs.current[i];
      const card = cardRefs.current[i];
      if (mediaEl) {
        mediaEl.style.width = `${size.w}px`;
        mediaEl.style.height = `${size.h}px`;
      }
      if (card) card.style.width = `${size.w}px`;
    };

    const syncExpandedToReact = () => {
      if (!reducedMotionRef.current) return;
      setExpandedCards(
        expandedRef.current.flatMap((on, i) => (on ? [i] : [])),
      );
    };

    const boot = () => {
      lenis.scrollTo(BASE_SET_WIDTH, { immediate: true, force: true });
    };
    boot();
    requestAnimationFrame(boot);

    /**
     * Expand when the left edge hits the activation window.
     * Stay expanded for the whole time the card is on-screen.
     * Only scale down once it has fully left past the left edge —
     * by then the next card is already scaling up.
     */
    const updateExpanded = () => {
      const viewport = wrapper.getBoundingClientRect();
      const expanded = expandedRef.current;
      let changed = false;

      for (let i = 0; i < totalCards; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        const rect = card.getBoundingClientRect();
        const relLeft = rect.left - viewport.left;
        const fullyOffLeft = rect.right <= viewport.left;
        const fullyOffRight = rect.left >= viewport.right;
        const inActivation = relLeft >= -8 && relLeft <= ACTIVATION_WINDOW;

        const was = expanded[i];
        if (inActivation) {
          expanded[i] = true;
        } else if (fullyOffLeft || fullyOffRight) {
          expanded[i] = false;
        }
        // else: still visible → keep current expanded state

        if (expanded[i] !== was) changed = true;
      }

      if (changed) syncExpandedToReact();
    };

    /** Snap off-screen non-focus cards to base so loop copies re-enter small. */
    const snapOffscreenToBase = () => {
      const viewport = wrapper.getBoundingClientRect();
      for (let i = 0; i < totalCards; i++) {
        if (expandedRef.current[i]) continue;
        const card = cardRefs.current[i];
        if (!card) continue;
        const rect = card.getBoundingClientRect();
        const off =
          rect.right <= viewport.left || rect.left >= viewport.right;
        if (!off) continue;
        const size = sizesRef.current[i];
        if (size.w === BASE_W && size.h === BASE_H) continue;
        size.w = BASE_W;
        size.h = BASE_H;
        applyCardSize(i);
      }
    };

    const updateFocalSizes = () => {
      updateExpanded();

      if (reducedMotionRef.current) return;

      const expanded = expandedRef.current;
      const scroll = lenis.animatedScroll;
      let anchor: HTMLElement | null = null;
      let anchorLeftBefore = 0;

      for (let i = 0; i < totalCards; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        const left = contentLeftOf(card);
        if (left + sizesRef.current[i].w > scroll) {
          anchor = card;
          anchorLeftBefore = left;
          break;
        }
      }

      for (let i = 0; i < totalCards; i++) {
        const size = sizesRef.current[i];
        const isFocus = expanded[i];
        const targetW = isFocus ? FOCUS_W : BASE_W;
        const targetH = isFocus ? FOCUS_H : BASE_H;

        size.w += (targetW - size.w) * SIZE_LERP;
        size.h += (targetH - size.h) * SIZE_LERP;
        if (Math.abs(targetW - size.w) < 0.05) size.w = targetW;
        if (Math.abs(targetH - size.h) < 0.05) size.h = targetH;
      }

      for (let i = 0; i < totalCards; i++) applyCardSize(i);
      snapOffscreenToBase();

      if (anchor && !wrappingRef.current) {
        const drift = contentLeftOf(anchor) - anchorLeftBefore;
        if (Math.abs(drift) > 0.001) {
          lenis.scrollTo(scroll + drift, { immediate: true, force: true });
        }
      }
    };

    const wrapScroll = () => {
      const set1 = cardRefs.current[setLen];
      const set2 = cardRefs.current[setLen * 2];
      if (!set1 || !set2) return;

      snapOffscreenToBase();

      const set1Left = contentLeftOf(set1);
      const set2Left = contentLeftOf(set2);
      const setWidth = set2Left - set1Left;
      if (setWidth <= 0) return;

      const scroll = lenis.animatedScroll;

      if (scroll >= set2Left) {
        wrappingRef.current = true;

        for (let i = 0; i < setLen; i++) {
          const src = setLen * 2 + i;
          for (const dstSet of [0, 1]) {
            const dst = dstSet * setLen + i;
            sizesRef.current[dst].w = sizesRef.current[src].w;
            sizesRef.current[dst].h = sizesRef.current[src].h;
            expandedRef.current[dst] = expandedRef.current[src];
            applyCardSize(dst);
          }
        }

        const delta = contentLeftOf(set2) - contentLeftOf(set1);
        lenis.scrollTo(scroll - delta, { immediate: true, force: true });
        lenis.resize();
        syncExpandedToReact();
        wrappingRef.current = false;
      } else if (scroll < set1Left - setWidth * 0.25) {
        wrappingRef.current = true;

        for (let i = 0; i < setLen; i++) {
          const src = i;
          for (const dstSet of [1, 2]) {
            const dst = dstSet * setLen + i;
            sizesRef.current[dst].w = sizesRef.current[src].w;
            sizesRef.current[dst].h = sizesRef.current[src].h;
            expandedRef.current[dst] = expandedRef.current[src];
            applyCardSize(dst);
          }
        }

        const delta = contentLeftOf(set1) - contentLeftOf(cardRefs.current[0]!);
        lenis.scrollTo(scroll + delta, { immediate: true, force: true });
        lenis.resize();
        syncExpandedToReact();
        wrappingRef.current = false;
      }
    };

    const tick = (time: number) => {
      if (!reducedMotionRef.current) {
        lenis.scrollTo(lenis.animatedScroll + AUTOPLAY_STEP, {
          immediate: true,
          force: true,
        });
      }

      wrapScroll();
      updateFocalSizes();
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    wrapper.addEventListener("wheel", preventScroll, { passive: false });
    wrapper.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      cancelAnimationFrame(rafRef.current);
      wrapper.removeEventListener("wheel", preventScroll);
      wrapper.removeEventListener("touchmove", preventScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [totalCards, setLen]);

  const slides = Array.from({ length: SET_COUNT }, (_, set) =>
    projects.map((project, i) => ({
      ...project,
      key: `${set}-${project.name}`,
      index: set * projects.length + i,
    })),
  ).flat();

  return (
    <section className="relative flex h-screen w-full shrink-0 flex-col overflow-hidden bg-forest">
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

      <h2 className="relative z-10 max-w-[450px] shrink-0 px-[50px] pt-8 font-display text-[48px] leading-[1.2] uppercase text-white">
        Work that speaks for us
      </h2>

      <div
        ref={wrapperRef}
        className="pointer-events-none relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-hidden pb-[30px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={contentRef}
          className="relative flex h-full w-max items-end gap-8 px-[50px]"
        >
          {slides.map((slide) => {
            const isFocus =
              reducedMotion && expandedCards.includes(slide.index);
            const mediaStyle: CSSProperties | undefined = reducedMotion
              ? {
                  width: isFocus ? FOCUS_W : BASE_W,
                  height: isFocus ? FOCUS_H : BASE_H,
                  transition: "width 500ms ease-out, height 500ms ease-out",
                }
              : undefined;

            return (
              <figure
                key={slide.key}
                ref={(el) => {
                  cardRefs.current[slide.index] = el;
                }}
                className="relative flex w-[357px] shrink-0 flex-col gap-4"
              >
                <div
                  ref={(el) => {
                    mediaRefs.current[slide.index] = el;
                  }}
                  className="work-carousel-media relative h-[521px] w-full overflow-hidden rounded"
                  style={mediaStyle}
                >
                  <Image
                    src={slide.src}
                    alt={slide.name}
                    fill
                    className="object-cover"
                    sizes={`${FOCUS_W}px`}
                    draggable={false}
                  />
                </div>
                <figcaption className="truncate font-[family-name:var(--font-instrument)] text-2xl leading-[1.2] text-white">
                  {slide.name}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
