"use client";

import React, { useState } from "react";
import { LightMode, DarkMode } from "@/icons";

const toggleDarkMode = (isDark: boolean, setIsDark: Function) => {
    setIsDark(!isDark);
    // TODO: Finish dark mode
};

export default function DarkModeButton() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="hover:bg-onHover p-1 rounded-md transition-all"
    onClick={() => toggleDarkMode(isDark, setIsDark) }>
      <LightMode />
    </div>
  );
}
