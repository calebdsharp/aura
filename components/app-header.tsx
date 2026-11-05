import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { ModeToggle } from "@/components/mode-toggle";

export const AppHeader = ({ userEmail }: { userEmail: string | null }) => (
  <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
    <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Aura
        </Link>
        {userEmail && (
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-foreground"
            >
              Settings
            </Link>
          </nav>
        )}
      </div>
      <div className="flex min-w-0 items-center gap-3">
        <ModeToggle />
        {userEmail && (
          <>
            <span className="hidden max-w-[220px] truncate text-sm text-muted-foreground sm:block">
              {userEmail}
            </span>
            <LogoutButton />
          </>
        )}
      </div>
    </div>
  </header>
);
