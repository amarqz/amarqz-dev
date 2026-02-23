"use client";

import { useEffect } from "react";

type Props = {
  selector: string;
};

export default function RevealOnScroll({ selector }: Props) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (nodes.length === 0) return;

    let rafId = 0;

    const update = () => {
      const triggerY = window.innerHeight * 0.95;
      for (const node of nodes) {
        if (node.classList.contains("in-view")) continue;
        const rect = node.getBoundingClientRect();
        if (rect.top <= triggerY) {
          node.classList.add("in-view");
        }
      }
      rafId = 0;
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [selector]);

  return null;
}
