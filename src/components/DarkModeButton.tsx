"use client";

import React, { useState } from "react";
import { LightMode, DarkMode } from "@/icons";

interface Props {
  text: string
};

const toggleDarkMode = (isDark: boolean, setIsDark: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsDark(!isDark);
    // TODO: Finish dark mode
};

export default function DarkModeButton({ text }: Props) {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="hidden group relative hover:bg-onHover p-1 rounded-md transition-all"
    onClick={() => toggleDarkMode(isDark, setIsDark) }>
      { isDark ? <DarkMode /> : <LightMode /> }
      <span className="pointer-events-none z-10 absolute w-max -bottom-9 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 bg-foreground text-background px-2 py-1 rounded-md">{ text }</span>
    </div>
  );
}
