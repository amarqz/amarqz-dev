"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  timelineId: string;
};

type IndicatorState = {
  src: string;
  alt: string;
  fallback: string;
  expanded: boolean;
};

const INITIAL_STATE: IndicatorState = {
  src: "",
  alt: "",
  fallback: "",
  expanded: false,
};

export default function TimelineScroller({ timelineId }: Props) {
  const [state, setState] = useState<IndicatorState>(INITIAL_STATE);
  const rafRef = useRef<number>(0);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = document.getElementById(timelineId);
    if (!timeline) return;

    let currentTop = 12;
    let targetTop = 12;

    const update = () => {
      const tracks = Array.from(timeline.querySelectorAll<HTMLElement>("[data-company-track]"));
      if (tracks.length === 0) {
        rafRef.current = requestAnimationFrame(update);
        return;
      }

      const timelineRect = timeline.getBoundingClientRect();
      const midY = window.innerHeight * 0.48;

      const lineStart = 12;
      const lineEnd = Math.max(lineStart, timeline.clientHeight - 12);
      const progress = Math.min(1, Math.max(0, (midY - timelineRect.top) / Math.max(1, timelineRect.height)));
      targetTop = lineStart + (lineEnd - lineStart) * progress;
      currentTop += (targetTop - currentTop) * 0.45;
      if (indicatorRef.current) {
        indicatorRef.current.style.top = `${currentTop}px`;
      }

      let expandedTrack: HTMLElement | null = null;
      for (const track of tracks) {
        const rect = track.getBoundingClientRect();
        const bandTop = rect.top + rect.height * 0.35;
        const bandBottom = rect.top + rect.height * 0.65;
        if (midY >= bandTop && midY <= bandBottom) {
          expandedTrack = track;
          break;
        }
      }

      if (!expandedTrack) {
        setState((prev) => (prev.expanded ? { ...prev, expanded: false } : prev));
        rafRef.current = requestAnimationFrame(update);
        return;
      }

      const src = expandedTrack.dataset.logoSrc || "";
      const alt = expandedTrack.dataset.logoAlt || "Company logo";
      const fallback = expandedTrack.dataset.logoFallback || "CO";

      setState((prev) => {
        if (
          prev.src === src &&
          prev.alt === alt &&
          prev.fallback === fallback &&
          prev.expanded
        ) {
          return prev;
        }

        return {
          src,
          alt,
          fallback,
          expanded: true,
        };
      });
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [timelineId]);

  return (
    <div
      ref={indicatorRef}
      className={`timeline-indicator ${state.expanded ? "expanded" : ""}`}
      aria-hidden="true"
    >
      <div className="timeline-indicator-core">
        {state.src ? (
          <Image src={state.src} alt={state.alt} width={40} height={40} className="timeline-indicator-logo" />
        ) : (
          <span className="timeline-indicator-fallback mono">{state.fallback}</span>
        )}
      </div>
    </div>
  );
}
