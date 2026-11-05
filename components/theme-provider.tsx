"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { createClient } from "@/lib/supabase/client";
import {
  getTheme,
  themeStyle,
  type ThemeMode,
} from "@/lib/themes";

export type { ThemeMode };

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => Promise<void>;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const MODE_KEY = "aura-mode";

// Apply a theme + mode to <html> without React state. Event handlers call
// this directly; the server layout renders the initial theme the same way,
// so the initial theme never flashes and needs no effect.
const applyTokens = (themeId: string, mode: ThemeMode) => {
  const root = document.documentElement;
  for (const [variable, value] of Object.entries(themeStyle(themeId, mode))) {
    root.style.setProperty(variable, value);
  }
  root.setAttribute("data-theme", themeId);
  root.classList.toggle("dark", mode === "dark");
};

export const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: string;
}) => {
  const [theme, setThemeState] = useState(getTheme(initialTheme).id);
  // Mode is device-local (localStorage only; profiles has no mode column),
  // so the server cannot know it and always renders light for first paint.
  // This one mount effect is the only place mode is read: it corrects a
  // dark mode right after mount, from a stored choice or, when there is
  // none, from the system preference. It never touches the theme, which
  // the server already rendered, and it never runs again.
  const [mode, setModeState] = useState<ThemeMode>("light");

  useEffect(() => {
    // No stored choice yet: fall back to the system preference. A stored
    // choice always wins over the system preference.
    const stored = localStorage.getItem(MODE_KEY);
    const resolved: ThemeMode =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    if (resolved === "dark") {
      applyTokens(getTheme(initialTheme).id, "dark");
      setModeState("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = async (newTheme: string) => {
    const id = getTheme(newTheme).id;
    if (id === theme) return;

    setThemeState(id);
    localStorage.setItem("aura-theme", id);
    applyTokens(id, mode);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      theme: id,
    });
  };

  const setMode = (newMode: ThemeMode) => {
    if (newMode === mode) return;

    setModeState(newMode);
    localStorage.setItem(MODE_KEY, newMode);
    applyTokens(theme, newMode);
  };

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, mode, setMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
