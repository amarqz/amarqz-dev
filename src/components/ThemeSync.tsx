"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { applyTheme, getPreferredTheme } from "@/lib/theme";

export default function ThemeSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    applyTheme(getPreferredTheme());
  }, [pathname]);

  return null;
}
