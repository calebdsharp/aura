import Link from "next/link";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const instant = false;

const Home = async () => {
  await connection();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold">Aura</h1>
        <p>Your home page, themed for you.</p>
        {user ? (
          <div className="space-y-2">
            <p>Logged in as {user.email}</p>
            <LogoutButton />
          </div>
        ) : (
          <Link href="/login" className="underline">
            Log in
          </Link>
        )}
        <Button>Primary button</Button>
        <div>
          <Link href="/settings" className="underline">
            Go to settings
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Logged in as {user?.email}</p>
              <p>
                Your theme is saved to your profile, so it follows you on
                refresh.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                This is a placeholder for now. A real calendar or weather widget
                would go here next.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Make it yours</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Change your theme, or let Gemini pick one from your interests.
              </p>
              <a href="/settings" className="underline">
                Go to Settings
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Home;
