export type Theme = "light" | "dark";

const THEME_KEY = "theme";

function normalizeTheme(value: string | null | undefined): Theme | null {
  return value === "light" || value === "dark" ? value : null;
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return normalizeTheme(window.localStorage.getItem(THEME_KEY));
  } catch {
    return null;
  }
}

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = getStoredTheme();
  if (stored) {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function readActiveTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  const fromDataset = normalizeTheme(document.documentElement.dataset.theme);
  return fromDataset ?? getPreferredTheme();
}

export function applyTheme(theme: Theme, persist = false) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;

  if (!persist || typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore storage write failures (private mode, disabled storage, etc.).
  }
}
