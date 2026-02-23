"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { ExpandMoreOutlined, GitHub, Grading, LinkedIn } from "@/icons";

type SectionId = "about" | "experience" | "projects" | "education";

type Props = {
  locale: string;
  switchTo: string;
  switchLang: string;
  labels: Record<SectionId, string>;
};

const sectionIds: SectionId[] = ["about", "experience", "projects", "education"];

export default function TopBar({ locale, switchTo, switchLang, labels }: Props) {
  const [active, setActive] = useState<SectionId>("about");
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef<HTMLElement | null>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);

      let nextActive: SectionId = "about";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          nextActive = id;
        }
      }
      setActive(nextActive);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!showMobileMenu) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (mobileMenuRef.current?.contains(target)) return;
      if (mobileMenuTriggerRef.current?.contains(target)) return;
      setShowMobileMenu(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [showMobileMenu]);

  const progressStyle = useMemo(
    () =>
      ({
        "--scroll-progress": `${Math.round(progress * 100)}%`,
      }) as CSSProperties,
    [progress]
  );

  return (
    <header className={`dock ${isScrolled ? "dock-scrolled" : ""}`} style={progressStyle}>
      <div className="dock-inner">
        <a href="#about" className="dock-brand mono">
          amarqz.dev
        </a>

        <nav className="dock-nav mono" aria-label="Section navigation">
          {sectionIds.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              {labels[id]}
            </a>
          ))}
        </nav>

        <div className="dock-actions">
          <Link target="_blank" href="https://github.com/amarqz" className="chip" aria-label="GitHub profile">
            <GitHub fontSize="small" />
          </Link>
          <Link target="_blank" href="https://linkedin.com/in/antoniomarquezpicon" className="chip" aria-label="LinkedIn profile">
            <LinkedIn fontSize="small" />
          </Link>
          <Link target="_blank" href="https://www.credly.com/users/antonio-marquez-picon" className="chip" aria-label="Credly profile">
            <Grading fontSize="small" />
          </Link>
          <Link href={`/${switchTo}`} className="chip mono" aria-label={switchLang}>
            {locale.toUpperCase()}
          </Link>
          <ThemeToggle />
          <button
            ref={mobileMenuTriggerRef}
            type="button"
            className="chip dock-mobile-trigger"
            aria-label="Toggle section navigation"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            <ExpandMoreOutlined
              fontSize="small"
              className={showMobileMenu ? "dock-menu-open" : ""}
            />
          </button>
        </div>
      </div>
      {showMobileMenu && (
        <nav ref={mobileMenuRef} className="dock-mobile-menu mono" aria-label="Mobile section navigation">
          {sectionIds.map((id) => (
            <a
              key={`mobile-${id}`}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={() => setShowMobileMenu(false)}
            >
              {labels[id]}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
