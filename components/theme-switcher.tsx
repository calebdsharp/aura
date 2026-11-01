"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export const ThemeSwitcher = () => {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={activeTheme === "default" ? "default" : "outline"}
          onClick={() => setTheme("default")}
        >
          Default
        </Button>
        <Button
          variant={activeTheme === "warm" ? "default" : "outline"}
          onClick={() => setTheme("warm")}
        >
          Warm
        </Button>
        <Button
          variant={activeTheme === "cool" ? "default" : "outline"}
          onClick={() => setTheme("cool")}
        >
          Cool
        </Button>
      </div>
      <div className="rounded-lg bg-background p-4 text-foreground">
        <p>Preview text</p>
        <Button>Primary button</Button>
      </div>
    </div>
  );
};
