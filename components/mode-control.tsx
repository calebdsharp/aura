"use client";

import { useTheme, type ThemeMode } from "@/components/theme-provider";

export const ModeControl = () => {
  const { mode, setMode } = useTheme();

  const options: { id: ThemeMode; label: string }[] = [
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
  ];

  return (
    <div
      className="flex shrink-0 rounded-md border bg-muted p-1"
      role="group"
      aria-label="Light or dark mode"
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={mode === option.id}
          onClick={() => setMode(option.id)}
          className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === option.id
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
