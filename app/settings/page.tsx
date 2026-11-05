import { PersonalizeForm } from "@/components/personalize-form";
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
        <ThemeSwitcher />
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
