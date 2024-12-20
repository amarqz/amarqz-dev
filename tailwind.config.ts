import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neutral: "var(--neutral)",
        subNeutral: "var(--subNeutral)",
        accent: "var(--accent)",
        onHover: "var(--onHover)",
        secondary: "var(--secondary)",
        next: "var(--next)",
        error: "var(--error)"
      },
    },
  },
  plugins: [],
};
export default config;
