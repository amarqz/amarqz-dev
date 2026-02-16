"use client";

import { useState } from "react";
import { DarkMode, LightMode } from "@/icons";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    const currentTheme = readTheme();
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="chip"
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      {theme === "dark" ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
    </button>
  );
}
