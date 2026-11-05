"use client";

import { Moon, Sun } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export const ModeToggle = () => {
  const { mode, toggleMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleMode}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};
