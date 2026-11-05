import type { CSSProperties } from "react";

export type ThemeMode = "light" | "dark";

export type ThemeTokens = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
};

export type ThemeDefinition = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  light: ThemeTokens;
  dark: ThemeTokens;
};

type Palette = {
  bg: string;
  fg: string;
  card: string;
  primary: string;
  primaryFg: string;
  secondary: string;
  secondaryFg?: string;
  muted: string;
  mutedFg: string;
  accent: string;
  accentFg?: string;
  border: string;
  destructive?: string;
};

const tokens = (p: Palette): ThemeTokens => ({
  background: p.bg,
  foreground: p.fg,
  card: p.card,
  cardForeground: p.fg,
  popover: p.card,
  popoverForeground: p.fg,
  primary: p.primary,
  primaryForeground: p.primaryFg,
  secondary: p.secondary,
  secondaryForeground: p.secondaryFg ?? p.fg,
  muted: p.muted,
  mutedForeground: p.mutedFg,
  accent: p.accent,
  accentForeground: p.accentFg ?? p.fg,
  destructive: p.destructive ?? "#dc2626",
  border: p.border,
  input: p.border,
  ring: p.primary,
  radius: "0.75rem",
});

export const THEMES: ThemeDefinition[] = [
  {
    id: "default",
    name: "Default",
    description: "Clean and neutral, light gray and ink.",
    tags: ["neutral", "calm"],
    light: tokens({
      bg: "#ffffff",
      fg: "#171717",
      card: "#ffffff",
      primary: "#262626",
      primaryFg: "#fafafa",
      secondary: "#f5f5f5",
      muted: "#f5f5f5",
      mutedFg: "#737373",
      accent: "#f5f5f5",
      border: "#e5e5e5",
    }),
    dark: tokens({
      bg: "#171717",
      fg: "#fafafa",
      card: "#262626",
      primary: "#f5f5f5",
      primaryFg: "#262626",
      secondary: "#404040",
      muted: "#404040",
      mutedFg: "#a3a3a3",
      accent: "#404040",
      border: "#404040",
      destructive: "#ef4444",
    }),
  },
  {
    id: "warm",
    name: "Warm",
    description: "Cream background, terracotta accents.",
    tags: ["warm", "soft"],
    light: tokens({
      bg: "#fdf6ec",
      fg: "#292524",
      card: "#fffbf2",
      primary: "#c2410c",
      primaryFg: "#fff7ed",
      secondary: "#f5e6d3",
      secondaryFg: "#44403c",
      muted: "#f3e8d8",
      mutedFg: "#78716c",
      accent: "#fbeedf",
      accentFg: "#9a3412",
      border: "#e7dcc8",
    }),
    dark: tokens({
      bg: "#1c1917",
      fg: "#fafaf9",
      card: "#292524",
      primary: "#ea580c",
      primaryFg: "#fff7ed",
      secondary: "#44403c",
      muted: "#44403c",
      mutedFg: "#a8a29e",
      accent: "#44403c",
      accentFg: "#fdba74",
      border: "#44403c",
      destructive: "#ef4444",
    }),
  },
  {
    id: "cool",
    name: "Cool",
    description: "Soft blue background, deep blue accents.",
    tags: ["cool", "calm"],
    light: tokens({
      bg: "#eff6ff",
      fg: "#0f172a",
      card: "#f8fbff",
      primary: "#0369a1",
      primaryFg: "#f0f9ff",
      secondary: "#e0f2fe",
      secondaryFg: "#0c4a6e",
      muted: "#e2eefb",
      mutedFg: "#475569",
      accent: "#dbeafe",
      accentFg: "#075985",
      border: "#dbeafe",
    }),
    dark: tokens({
      bg: "#0b1220",
      fg: "#f0f9ff",
      card: "#16233a",
      primary: "#38bdf8",
      primaryFg: "#082f49",
      secondary: "#1e293b",
      muted: "#1e293b",
      mutedFg: "#94a3b8",
      accent: "#1e293b",
      accentFg: "#7dd3fc",
      border: "#1e293b",
      destructive: "#ef4444",
    }),
  },
  {
    id: "forest",
    name: "Forest",
    description: "Deep greens, calm and grounded.",
    tags: ["nature", "calm"],
    light: tokens({
      bg: "#f0fdf4",
      fg: "#14532d",
      card: "#ffffff",
      primary: "#15803d",
      primaryFg: "#f0fdf4",
      secondary: "#dcfce7",
      secondaryFg: "#166534",
      muted: "#dcfce7",
      mutedFg: "#52755e",
      accent: "#dcfce7",
      accentFg: "#166534",
      border: "#bbf7d0",
    }),
    dark: tokens({
      bg: "#052e16",
      fg: "#f0fdf4",
      card: "#0a2e1a",
      primary: "#4ade80",
      primaryFg: "#052e16",
      secondary: "#14532d",
      muted: "#14532d",
      mutedFg: "#86efac",
      accent: "#14532d",
      accentFg: "#bbf7d0",
      border: "#14532d",
      destructive: "#ef4444",
    }),
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Teal water, deep and refreshing.",
    tags: ["cool", "nature"],
    light: tokens({
      bg: "#ecfeff",
      fg: "#164e63",
      card: "#ffffff",
      primary: "#0e7490",
      primaryFg: "#ecfeff",
      secondary: "#cffafe",
      secondaryFg: "#155e75",
      muted: "#cffafe",
      mutedFg: "#4a7a8c",
      accent: "#cffafe",
      accentFg: "#155e75",
      border: "#a5f3fc",
    }),
    dark: tokens({
      bg: "#042f2e",
      fg: "#ecfeff",
      card: "#083344",
      primary: "#2dd4bf",
      primaryFg: "#042f2e",
      secondary: "#155e75",
      muted: "#155e75",
      mutedFg: "#5eead4",
      accent: "#155e75",
      accentFg: "#99f6e4",
      border: "#155e75",
      destructive: "#ef4444",
    }),
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm orange and pink, golden-hour light.",
    tags: ["warm", "bold"],
    light: tokens({
      bg: "#fff7ed",
      fg: "#431407",
      card: "#ffffff",
      primary: "#ea580c",
      primaryFg: "#fff7ed",
      secondary: "#ffedd5",
      secondaryFg: "#9a3412",
      muted: "#ffedd5",
      mutedFg: "#9a6b4f",
      accent: "#ffedd5",
      accentFg: "#9a3412",
      border: "#fed7aa",
    }),
    dark: tokens({
      bg: "#200a04",
      fg: "#fff7ed",
      card: "#2d1206",
      primary: "#fb923c",
      primaryFg: "#431407",
      secondary: "#7c2d12",
      muted: "#7c2d12",
      mutedFg: "#fdba74",
      accent: "#7c2d12",
      accentFg: "#fed7aa",
      border: "#7c2d12",
      destructive: "#ef4444",
    }),
  },
  {
    id: "lavender",
    name: "Lavender",
    description: "Soft purple, quiet and gentle.",
    tags: ["soft", "calm"],
    light: tokens({
      bg: "#faf5ff",
      fg: "#3b0764",
      card: "#ffffff",
      primary: "#7e22ce",
      primaryFg: "#faf5ff",
      secondary: "#f3e8ff",
      secondaryFg: "#6b21a8",
      muted: "#f3e8ff",
      mutedFg: "#7a5a9e",
      accent: "#f3e8ff",
      accentFg: "#6b21a8",
      border: "#e9d5ff",
    }),
    dark: tokens({
      bg: "#1e1033",
      fg: "#faf5ff",
      card: "#2e1a4d",
      primary: "#c084fc",
      primaryFg: "#3b0764",
      secondary: "#581c87",
      muted: "#581c87",
      mutedFg: "#d8b4fe",
      accent: "#581c87",
      accentFg: "#e9d5ff",
      border: "#581c87",
      destructive: "#ef4444",
    }),
  },
  {
    id: "rose",
    name: "Rose",
    description: "Soft pink with a deep rose accent.",
    tags: ["warm", "soft"],
    light: tokens({
      bg: "#fff1f2",
      fg: "#4c0519",
      card: "#ffffff",
      primary: "#be123c",
      primaryFg: "#fff1f2",
      secondary: "#ffe4e6",
      secondaryFg: "#9f1239",
      muted: "#ffe4e6",
      mutedFg: "#9d5a6b",
      accent: "#ffe4e6",
      accentFg: "#9f1239",
      border: "#fecdd3",
    }),
    dark: tokens({
      bg: "#2a0a12",
      fg: "#fff1f2",
      card: "#3d0f1c",
      primary: "#fb7185",
      primaryFg: "#4c0519",
      secondary: "#881337",
      muted: "#881337",
      mutedFg: "#fda4af",
      accent: "#881337",
      accentFg: "#fecdd3",
      border: "#881337",
      destructive: "#ef4444",
    }),
  },
  {
    id: "mint",
    name: "Mint",
    description: "Fresh green, light and crisp.",
    tags: ["fresh", "nature"],
    light: tokens({
      bg: "#ecfdf5",
      fg: "#022c22",
      card: "#ffffff",
      primary: "#047857",
      primaryFg: "#ecfdf5",
      secondary: "#d1fae5",
      secondaryFg: "#065f46",
      muted: "#d1fae5",
      mutedFg: "#4b7a6a",
      accent: "#d1fae5",
      accentFg: "#065f46",
      border: "#a7f3d0",
    }),
    dark: tokens({
      bg: "#022c22",
      fg: "#ecfdf5",
      card: "#064e3b",
      primary: "#34d399",
      primaryFg: "#022c22",
      secondary: "#065f46",
      muted: "#065f46",
      mutedFg: "#6ee7b7",
      accent: "#065f46",
      accentFg: "#a7f3d0",
      border: "#065f46",
      destructive: "#ef4444",
    }),
  },
  {
    id: "amber",
    name: "Amber",
    description: "Golden honey, warm and rich.",
    tags: ["warm", "bold"],
    light: tokens({
      bg: "#fffbeb",
      fg: "#451a03",
      card: "#ffffff",
      primary: "#b45309",
      primaryFg: "#fffbeb",
      secondary: "#fef3c7",
      secondaryFg: "#92400e",
      muted: "#fef3c7",
      mutedFg: "#8a6d3b",
      accent: "#fef3c7",
      accentFg: "#92400e",
      border: "#fde68a",
    }),
    dark: tokens({
      bg: "#1c1005",
      fg: "#fffbeb",
      card: "#2e1c07",
      primary: "#fbbf24",
      primaryFg: "#451a03",
      secondary: "#78350f",
      muted: "#78350f",
      mutedFg: "#fcd34d",
      accent: "#78350f",
      accentFg: "#fde68a",
      border: "#78350f",
      destructive: "#ef4444",
    }),
  },
  {
    id: "slate",
    name: "Slate",
    description: "Graphite gray, steady and understated.",
    tags: ["neutral", "cool"],
    light: tokens({
      bg: "#f8fafc",
      fg: "#0f172a",
      card: "#ffffff",
      primary: "#334155",
      primaryFg: "#f8fafc",
      secondary: "#e2e8f0",
      secondaryFg: "#1e293b",
      muted: "#e2e8f0",
      mutedFg: "#64748b",
      accent: "#e2e8f0",
      accentFg: "#1e293b",
      border: "#cbd5e1",
    }),
    dark: tokens({
      bg: "#0f172a",
      fg: "#f8fafc",
      card: "#1e293b",
      primary: "#94a3b8",
      primaryFg: "#0f172a",
      secondary: "#334155",
      muted: "#334155",
      mutedFg: "#94a3b8",
      accent: "#334155",
      accentFg: "#e2e8f0",
      border: "#334155",
      destructive: "#ef4444",
    }),
  },
  {
    id: "citrus",
    name: "Citrus",
    description: "Bright lime, energetic and fresh.",
    tags: ["fresh", "bold"],
    light: tokens({
      bg: "#f7fee7",
      fg: "#1a2e05",
      card: "#ffffff",
      primary: "#65a30d",
      primaryFg: "#f7fee7",
      secondary: "#ecfccb",
      secondaryFg: "#3f6212",
      muted: "#ecfccb",
      mutedFg: "#5a7a2e",
      accent: "#ecfccb",
      accentFg: "#3f6212",
      border: "#d9f99d",
    }),
    dark: tokens({
      bg: "#1a2e05",
      fg: "#f7fee7",
      card: "#233d08",
      primary: "#a3e635",
      primaryFg: "#1a2e05",
      secondary: "#3f6212",
      muted: "#3f6212",
      mutedFg: "#bef264",
      accent: "#3f6212",
      accentFg: "#d9f99d",
      border: "#3f6212",
      destructive: "#ef4444",
    }),
  },
];

export const THEME_IDS = THEMES.map((theme) => theme.id);

export const THEME_TAGS = Array.from(
  new Set(THEMES.flatMap((theme) => theme.tags)),
).sort();

export const getTheme = (id: string | null | undefined): ThemeDefinition =>
  THEMES.find((theme) => theme.id === id) ?? THEMES[0];

export const themeTokens = (
  id: string | null | undefined,
  mode: ThemeMode,
): ThemeTokens => getTheme(id)[mode];

const TOKEN_VARS: [keyof ThemeTokens, string][] = [
  ["background", "--background"],
  ["foreground", "--foreground"],
  ["card", "--card"],
  ["cardForeground", "--card-foreground"],
  ["popover", "--popover"],
  ["popoverForeground", "--popover-foreground"],
  ["primary", "--primary"],
  ["primaryForeground", "--primary-foreground"],
  ["secondary", "--secondary"],
  ["secondaryForeground", "--secondary-foreground"],
  ["muted", "--muted"],
  ["mutedForeground", "--muted-foreground"],
  ["accent", "--accent"],
  ["accentForeground", "--accent-foreground"],
  ["destructive", "--destructive"],
  ["border", "--border"],
  ["input", "--input"],
  ["ring", "--ring"],
  ["radius", "--radius"],
];

export const themeStyle = (
  id: string | null | undefined,
  mode: ThemeMode,
): Record<string, string> => {
  const tokensForMode = themeTokens(id, mode);
  return Object.fromEntries(
    TOKEN_VARS.map(([key, variable]) => [variable, tokensForMode[key]]),
  );
};

export const themeCssProperties = (
  id: string | null | undefined,
  mode: ThemeMode,
): CSSProperties => themeStyle(id, mode) as CSSProperties;
