"use client";

import { useTheme } from "./theme-provider";
import { STYLES, type StyleDefinition } from "@/lib/styles";
import { getTheme } from "@/lib/themes";

const StyleCard = ({
  style,
  active,
  recommended,
  onSelect,
}: {
  style: StyleDefinition;
  active: boolean;
  recommended: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onSelect}
    className={`w-full rounded-lg border bg-card p-4 text-left transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
      active
        ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
        : "border-border"
    }`}
  >
    <div
      className="mb-3 border bg-background px-3 py-2"
      style={{
        fontFamily: style.fontSans,
        borderRadius: style.radius,
        boxShadow: style.shadowMd,
      }}
    >
      <span
        className="block text-xl font-bold"
        style={{ fontFamily: style.fontHeading }}
      >
        Aa
      </span>
      <span className="block truncate text-sm text-muted-foreground">
        The quick brown fox
      </span>
    </div>
    <span className="flex items-center gap-2">
      <span className="text-sm font-semibold">{style.name}</span>
      {active && (
        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
          Active
        </span>
      )}
      {recommended && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          Recommended
        </span>
      )}
    </span>
    <span className="mt-1 block text-sm text-muted-foreground">
      {style.description}
    </span>
  </button>
);

export const StyleSwitcher = () => {
  const { theme, style: activeStyle, setStyle, resetStyle, styleIsRecommended } =
    useTheme();
  const recommendedId = getTheme(theme).recommendedStyleId;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {STYLES.map((style) => (
          <StyleCard
            key={style.id}
            style={style}
            active={activeStyle === style.id}
            recommended={style.id === recommendedId}
            onSelect={() => setStyle(style.id)}
          />
        ))}
      </div>
      {!styleIsRecommended && (
        <div className="flex items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3">
          <p className="text-sm text-muted-foreground">
            You picked a style of your own. It stays put when you change
            themes.
          </p>
          <button
            type="button"
            onClick={resetStyle}
            className="shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted"
          >
            Use recommended
          </button>
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        {STYLES.length} styles. A style changes fonts, corners, shadows, and
        spacing for every theme. Saved on this device only.
      </p>
    </div>
  );
};
