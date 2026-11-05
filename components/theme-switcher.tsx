"use client";

import { useMemo, useState } from "react";

import { useTheme } from "./theme-provider";
import { Input } from "./ui/input";
import { THEMES, THEME_TAGS, getTheme, type ThemeDefinition } from "@/lib/themes";

const Swatches = ({ theme }: { theme: ThemeDefinition }) => {
  const { mode } = useTheme();
  const tokens = theme[mode];
  return (
    <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
      <span
        className="h-6 w-6 rounded-full border"
        style={{ backgroundColor: tokens.background, borderColor: tokens.border }}
      />
      <span
        className="h-6 w-6 rounded-full border"
        style={{ backgroundColor: tokens.card, borderColor: tokens.border }}
      />
      <span
        className="h-6 w-6 rounded-full"
        style={{ backgroundColor: tokens.primary }}
      />
    </span>
  );
};

const ThemeRow = ({
  theme,
  active,
  onSelect,
}: {
  theme: ThemeDefinition;
  active: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onSelect}
    className={`flex w-full items-center gap-3 rounded-lg border bg-card px-3 py-2.5 text-left transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
      active
        ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
        : "border-border"
    }`}
  >
    <Swatches theme={theme} />
    <span className="min-w-0 flex-1">
      <span className="flex items-center gap-2">
        <span className="text-sm font-semibold">{theme.name}</span>
        {active && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            Active
          </span>
        )}
      </span>
      <span className="block truncate text-sm text-muted-foreground">
        {theme.description}
      </span>
    </span>
    <span className="hidden shrink-0 gap-1 sm:flex">
      {theme.tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </span>
  </button>
);

export const ThemeSwitcher = () => {
  const { theme: activeTheme, setTheme, mode } = useTheme();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const current = getTheme(activeTheme);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return THEMES.filter((theme) => {
      if (tag !== "all" && !theme.tags.includes(tag)) return false;
      if (!q) return true;
      return (
        theme.name.toLowerCase().includes(q) ||
        theme.description.toLowerCase().includes(q) ||
        theme.tags.some((t) => t.includes(q))
      );
    });
  }, [query, tag]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Current theme</p>
            <p className="text-lg font-semibold">
              {current.name} · {mode === "dark" ? "Dark" : "Light"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {current.description}
            </p>
          </div>
          <Swatches theme={current} />
        </div>
      </div>

      <div className="space-y-3">
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search themes…"
          aria-label="Search themes"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by mood">
          {["all", ...THEME_TAGS].map((chip) => (
            <button
              key={chip}
              type="button"
              aria-pressed={tag === chip}
              onClick={() => setTag(chip)}
              className={`rounded-full border px-3 py-1 text-sm capitalize transition-colors ${
                tag === chip
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {chip === "all" ? "All" : chip}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No themes match “{query}”. Try a different search or filter.
        </p>
      ) : (
        <div className="space-y-2">
          {visible.map((theme) => (
            <ThemeRow
              key={theme.id}
              theme={theme}
              active={activeTheme === theme.id}
              onSelect={() => setTheme(theme.id)}
            />
          ))}
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        {THEMES.length} themes. Picking one applies it right away and saves it
        to your profile.
      </p>
    </div>
  );
};
