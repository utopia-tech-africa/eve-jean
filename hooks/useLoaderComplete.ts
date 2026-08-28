"use client";

import { useEffect, useState } from "react";
import { LOADER_COMPLETE_EVENT } from "@/lib/loader";

export function useLoaderComplete() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setComplete(true);
      return;
    }

    const onComplete = () => setComplete(true);
    window.addEventListener(LOADER_COMPLETE_EVENT, onComplete);
    return () =>
      window.removeEventListener(LOADER_COMPLETE_EVENT, onComplete);
  }, []);

  return complete;
}
