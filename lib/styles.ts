import type { CSSProperties } from "react";

// A Style is the "feel" axis of Aura, independent of the color Theme and
// the light/dark Mode: fonts, corner radius, shadows/elevation, and card
// spacing. 12 themes x 4 styles = 48 looks from 16 definitions, instead
// of needing a separate theme for every feel.
//
// Font stacks use only fonts already loaded (Geist) or system stacks, so
// no network font dependency is added. Shadow and radius values are plain
// CSS, applied as variables on <html> the same way theme tokens are.

export type StyleId = "clean" | "soft" | "sharp" | "bold";

export type StyleDefinition = {
  id: StyleId;
  name: string;
  description: string;
  fontSans: string;
  fontHeading: string;
  radius: string;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  cardSpacing: string;
};

const GEIST = "var(--font-geist-sans)";
const ROUNDED =
  "ui-rounded, 'Hiragino Maru Gothic ProN', 'Segoe UI', system-ui, sans-serif";
const SYSTEM =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export const STYLES: StyleDefinition[] = [
  {
    id: "clean",
    name: "Clean",
    description: "Geist Sans, medium corners, subtle shadows. The current look.",
    fontSans: GEIST,
    fontHeading: GEIST,
    radius: "0.75rem",
    shadowSm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    shadowMd: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    shadowLg:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    cardSpacing: "1rem",
  },
  {
    id: "soft",
    name: "Soft",
    description: "Rounded font, big soft corners, gentle shadows, airy spacing.",
    fontSans: ROUNDED,
    fontHeading: ROUNDED,
    radius: "1.25rem",
    shadowSm: "0 2px 12px rgb(0 0 0 / 0.06)",
    shadowMd: "0 12px 32px -8px rgb(0 0 0 / 0.12)",
    shadowLg: "0 24px 48px -12px rgb(0 0 0 / 0.14)",
    cardSpacing: "1.5rem",
  },
  {
    id: "sharp",
    name: "Sharp",
    description: "Square corners, flat surfaces, thin borders, tight spacing.",
    fontSans: SYSTEM,
    fontHeading: SYSTEM,
    radius: "0.125rem",
    shadowSm: "0 0 #0000",
    shadowMd: "0 0 #0000",
    shadowLg: "0 0 #0000",
    cardSpacing: "0.75rem",
  },
  {
    id: "bold",
    name: "Bold",
    description: "Heavier presence, strong shadows, more contrast.",
    fontSans: GEIST,
    fontHeading: GEIST,
    radius: "0.5rem",
    shadowSm: "0 2px 4px rgb(0 0 0 / 0.18), 0 1px 2px rgb(0 0 0 / 0.2)",
    shadowMd: "0 8px 16px -4px rgb(0 0 0 / 0.25)",
    shadowLg: "0 16px 32px -8px rgb(0 0 0 / 0.3)",
    cardSpacing: "1.25rem",
  },
];

export const STYLE_IDS = STYLES.map((style) => style.id);

export const getStyle = (id: string | null | undefined): StyleDefinition =>
  STYLES.find((style) => style.id === id) ?? STYLES[0];

const STYLE_VARS: [keyof StyleDefinition, string][] = [
  ["fontSans", "--aura-font-sans"],
  ["fontHeading", "--aura-font-heading"],
  ["radius", "--radius"],
  ["shadowSm", "--aura-shadow-sm"],
  ["shadowMd", "--aura-shadow-md"],
  ["shadowLg", "--aura-shadow-lg"],
  ["cardSpacing", "--aura-card-spacing"],
];

export const styleStyle = (
  id: string | null | undefined,
): Record<string, string> => {
  const style = getStyle(id);
  return Object.fromEntries(
    STYLE_VARS.map(([key, variable]) => [variable, style[key]]),
  );
};

export const styleCssProperties = (
  id: string | null | undefined,
): CSSProperties => styleStyle(id) as CSSProperties;
