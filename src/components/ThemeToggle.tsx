"use client";

import { DarkMode, LightMode } from "@/icons";
import { applyTheme, readActiveTheme, type Theme } from "@/lib/theme";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const currentTheme = readActiveTheme();
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="chip"
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <span className="theme-icon theme-icon-light" aria-hidden="true">
        <LightMode fontSize="small" />
      </span>
      <span className="theme-icon theme-icon-dark" aria-hidden="true">
        <DarkMode fontSize="small" />
      </span>
    </button>
  );
}
