"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

let currentTheme = "default";
if (typeof window !== "undefined") {
  currentTheme = localStorage.getItem("aura-theme") || "default";
  document.documentElement.setAttribute("data-theme", currentTheme);
}

const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

const getSnapshot = () => currentTheme;
const getServerSnapshot = () => "default";

const setThemeValue = (theme: string) => {
  currentTheme = theme;
  localStorage.setItem("aura-theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  listeners.forEach((listener) => listener());
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeValue }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
