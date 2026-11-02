"use client";

import { useTheme } from "./theme-provider";

const presets = [
  {
    id: "default",
    name: "Default",
    description: "Clean and neutral, light gray and ink.",
    background: "#ffffff",
    card: "#f5f5f5",
    primary: "#262626",
  },
  {
    id: "warm",
    name: "Warm",
    description: "Cream background, terracotta accents.",
    background: "#fdf6ec",
    card: "#fffbf2",
    primary: "#c2410c",
  },
  {
    id: "cool",
    name: "Cool",
    description: "Soft blue background, deep blue accents.",
    background: "#eff6ff",
    card: "#f8fbff",
    primary: "#0369a1",
  },
] as const;

export const ThemeSwitcher = () => {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {presets.map((preset) => {
        const active = activeTheme === preset.id;
        return (
          <button
            key={preset.id}
            type="button"
            aria-pressed={active}
            onClick={() => setTheme(preset.id)}
            className={`rounded-lg border bg-card p-4 text-left transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              active
                ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "border-border"
            }`}
          >
            <div
              className="flex h-20 items-end rounded-md border p-3"
              style={{ backgroundColor: preset.background, borderColor: preset.card }}
            >
              <div
                className="h-8 w-full rounded-sm"
                style={{ backgroundColor: preset.card }}
              />
              <div
                className="ml-2 h-8 w-8 shrink-0 rounded-full"
                style={{ backgroundColor: preset.primary }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-base font-semibold">{preset.name}</span>
              {active && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  Active
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {preset.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};
