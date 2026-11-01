import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => (
  <main className="min-h-screen bg-background text-foreground">
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">Aura</h1>
      <p>Your home page, themed for you.</p>
      <Button>Primary button</Button>
      <div>
        <Link href="/settings" className="underline">
          Go to settings
        </Link>
      </div>
    </div>
  </main>
);

export default Home;
