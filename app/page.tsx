import Link from "next/link";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const instant = false;

const themeLabels: Record<string, string> = {
  default: "Default",
  warm: "Warm",
  cool: "Cool",
};

const Home = async () => {
  await connection();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let theme = "default";
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("theme")
      .eq("id", user.id)
      .single();
    if (data?.theme) theme = data.theme;
  }
  const themeLabel = themeLabels[theme] ?? "Default";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10">
        <section className="max-w-2xl space-y-4">
          <p className="text-sm font-medium text-muted-foreground">
            Welcome back
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your home, in {themeLabel}.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Aura shapes this page around your saved theme. Change it anytime in
            Settings, or let it pick one from what you are into.
          </p>
          <div>
            <Link
              href="/settings"
              className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
            >
              Change your theme
            </Link>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Your theme, saved to your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                {user?.email
                  ? `Signed in as ${user.email}.`
                  : "You are signed in."}
              </p>
              <p className="text-muted-foreground">
                Your {themeLabel} theme follows you on refresh.
              </p>
              <Link
                href="/settings"
                className="text-sm font-medium text-primary hover:underline"
              >
                Change theme
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Today</CardTitle>
              <CardDescription>{today}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No calendar or weather is connected yet. This card will grow
                when one is.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Make it yours</CardTitle>
              <CardDescription>Pick a theme, or let Aura pick one</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Change your theme, or let Gemini pick one from your interests.
              </p>
              <Link
                href="/settings"
                className="text-sm font-medium text-primary hover:underline"
              >
                Go to Settings
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Home;
