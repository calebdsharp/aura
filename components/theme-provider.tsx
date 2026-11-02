"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { createClient } from "@/lib/supabase/client";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: string;
}) => {
  const [theme, setThemeState] = useState(initialTheme || "default");

  const setTheme = async (newTheme: string) => {
    if (newTheme === theme) return;

    setThemeState(newTheme);
    localStorage.setItem("aura-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      theme: newTheme,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
