import { ModeControl } from "@/components/mode-control";
import { PersonalizeForm } from "@/components/personalize-form";
import { StyleSwitcher } from "@/components/style-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SettingsPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10">
      <section className="max-w-2xl space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Shape Aura around you. Pick a theme, or let it pick one from what
          you are into.
        </p>
      </section>

      <section className="space-y-4 border-t pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Theme</h2>
        <p className="text-sm text-muted-foreground">
          Choose a preset. It applies right away and is saved to your profile.
        </p>
        <div className="flex items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3">
          <div>
            <p className="text-sm font-medium">Appearance</p>
            <p className="text-sm text-muted-foreground">
              Light or dark, for any theme. Saved on this device only.
            </p>
          </div>
          <ModeControl />
        </div>
        <ThemeSwitcher />
      </section>

      <section className="space-y-4 border-t pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Style</h2>
        <p className="text-sm text-muted-foreground">
          How Aura feels: fonts, corners, shadows, and spacing. Each theme
          recommends one, and you can pick a different one — it works with
          any theme.
        </p>
        <StyleSwitcher />
      </section>

      <section className="space-y-4 border-t pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Personalize</h2>
        <p className="text-sm text-muted-foreground">
          Tell Aura what you are into, and it will suggest a theme.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Let Aura pick</CardTitle>
            <CardDescription>
              Your interests are used only to pick a preset theme.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PersonalizeForm />
          </CardContent>
        </Card>
      </section>
    </div>
  </main>
);
export default SettingsPage;
