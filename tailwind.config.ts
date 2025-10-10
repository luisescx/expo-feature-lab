import type { Config } from "tailwindcss";

export const customColors = {
  light: {
    primary: "#2563EB",
    secondary: "#7C3AED",
    tertiary: "#0D9488",
    positive: "#16A34A",
    warning: "#EAB308",
    negative: "#DC2626",
    neutral100: "#111827",
    neutral200: "#374151",
    neutral300: "#6B7280",
    background: "#F9FAFB",
    surface: "#FFFFFF",
    link: "#2f45de",
  },
  dark: {
    primary: "#1D4ED8",
    secondary: "#9333EA",
    tertiary: "#10B981",
    positive: "#22C55E",
    warning: "#FACC15",
    negative: "#EF4444",
    neutral100: "#F3F4F6",
    neutral200: "#E5E7EB",
    neutral300: "#9CA3AF",
    background: "#0F172A",
    surface: "#1E293B",
    link: "#48a6fe",
  },
} as const;

export type CustomTheme = typeof customColors;

const config: Config = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...customColors,
      },
    },
  },
  plugins: [],
};

export default config;
