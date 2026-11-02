import Link from "next/link";

import { PersonalizeForm } from "@/components/personalize-form";
import { ThemeSwitcher } from "@/components/theme-switcher";

const SettingsPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p>Choose a theme for Aura.</p>
      <ThemeSwitcher />
      <PersonalizeForm />
      <div>
        <Link href="/" className="underline">
          Back to home
        </Link>
      </div>
    </div>
  </main>
);
export default SettingsPage;
