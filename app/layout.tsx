import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";

import { AppHeader } from "@/components/app-header";
import { ThemeProvider } from "@/components/theme-provider";
import { createClient } from "@/lib/supabase/server";
import { getStyle, styleCssProperties } from "@/lib/styles";
import { getTheme, themeCssProperties } from "@/lib/themes";

import "./globals.css";
import { connection } from "next/server";

export const instant = false;

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Your home page, themed for you.",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  await connection();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialTheme = "default";
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("theme")
      .eq("id", user.id)
      .single();
    if (data?.theme) initialTheme = data.theme;
  }
  // Unknown stored ids fall back to Default; mode is device-local, so the
  // server always renders the light tokens for first paint. Style is also
  // device-local, so the server renders the theme's recommended style;
  // a stored style override is corrected on mount by the provider.
  initialTheme = getTheme(initialTheme).id;
  const initialStyle = getStyle(getTheme(initialTheme).recommendedStyleId).id;

  return (
    <html
      lang="en"
      data-theme={initialTheme}
      data-style={initialStyle}
      style={{
        ...themeCssProperties(initialTheme, "light"),
        ...styleCssProperties(initialStyle),
      }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider key={initialTheme} initialTheme={initialTheme}>
          <AppHeader userEmail={user?.email ?? null} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
