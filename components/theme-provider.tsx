"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { createClient } from "@/lib/supabase/client";
import {
  getStyle,
  styleStyle,
  type StyleId,
} from "@/lib/styles";
import {
  getTheme,
  themeStyle,
  type ThemeMode,
} from "@/lib/themes";

export type { ThemeMode };
export type { StyleId };

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => Promise<void>;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  style: StyleId;
  setStyle: (style: StyleId) => void;
  resetStyle: () => void;
  styleIsRecommended: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const MODE_KEY = "aura-mode";
const STYLE_KEY = "aura-style";

// Apply a theme + mode + style to <html> without React state. Event
// handlers call this directly; the server layout renders the initial theme
// and its recommended style the same way, so the initial theme never
// flashes and needs no effect.
const applyTokens = (themeId: string, mode: ThemeMode, styleId: StyleId) => {
  const root = document.documentElement;
  for (const [variable, value] of Object.entries(themeStyle(themeId, mode))) {
    root.style.setProperty(variable, value);
  }
  // Style tokens come after theme tokens so a style's radius wins over
  // the theme token's radius.
  for (const [variable, value] of Object.entries(styleStyle(styleId))) {
    root.style.setProperty(variable, value);
  }
  root.setAttribute("data-theme", themeId);
  root.setAttribute("data-style", styleId);
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
  // This one mount effect is the only place mode and a stored style
  // override are read: it corrects a dark mode and/or a stored style right
  // after mount, from a stored choice or, when there is none, from the
  // system preference (mode) / the theme's recommended style. It never
  // touches the theme, which the server already rendered, and it never
  // runs again.
  const [mode, setModeState] = useState<ThemeMode>("light");
  // Style starts at the initial theme's recommended style; a stored
  // explicit choice, if any, replaces it in the mount effect below.
  const [style, setStyleState] = useState<StyleId>(
    getStyle(getTheme(initialTheme).recommendedStyleId).id,
  );
  const [styleIsRecommended, setStyleIsRecommended] = useState(true);

  useEffect(() => {
    // No stored mode yet: fall back to the system preference. A stored
    // choice always wins over the system preference.
    const storedMode = localStorage.getItem(MODE_KEY);
    const resolvedMode: ThemeMode =
      storedMode === "dark" || storedMode === "light"
        ? storedMode
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    const storedStyle = localStorage.getItem(STYLE_KEY);
    const resolvedStyle = getStyle(storedStyle).id;
    const hasStoredStyle = storedStyle === resolvedStyle && storedStyle !== null;
    const recommendedStyle = getStyle(
      getTheme(initialTheme).recommendedStyleId,
    ).id;
    if (resolvedMode === "dark" || hasStoredStyle) {
      applyTokens(
        getTheme(initialTheme).id,
        resolvedMode,
        hasStoredStyle ? resolvedStyle : recommendedStyle,
      );
      if (resolvedMode === "dark") setModeState("dark");
      if (hasStoredStyle) {
        setStyleState(resolvedStyle);
        setStyleIsRecommended(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = async (newTheme: string) => {
    const id = getTheme(newTheme).id;
    if (id === theme) return;

    setThemeState(id);
    localStorage.setItem("aura-theme", id);
    // No stored style override: follow the new theme's recommended style.
    // An explicit style choice is kept across theme changes.
    const storedStyle = localStorage.getItem(STYLE_KEY);
    const nextStyle = storedStyle
      ? style
      : getStyle(getTheme(id).recommendedStyleId).id;
    if (!storedStyle) {
      setStyleState(nextStyle);
      setStyleIsRecommended(true);
    }
    applyTokens(id, mode, nextStyle);

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
    applyTokens(theme, newMode, style);
  };

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const setStyle = (newStyle: StyleId) => {
    const id = getStyle(newStyle).id;
    if (id === style) return;

    setStyleState(id);
    setStyleIsRecommended(false);
    localStorage.setItem(STYLE_KEY, id);
    applyTokens(theme, mode, id);
  };

  const resetStyle = () => {
    const recommended = getStyle(getTheme(theme).recommendedStyleId).id;
    localStorage.removeItem(STYLE_KEY);
    setStyleState(recommended);
    setStyleIsRecommended(true);
    applyTokens(theme, mode, recommended);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        mode,
        setMode,
        toggleMode,
        style,
        setStyle,
        resetStyle,
        styleIsRecommended,
      }}
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
