"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleSignUp = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage("Account created. You can now log in.");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-sm space-y-6 p-8">
        <h1 className="text-3xl font-bold">Log in to Aura</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm">{message}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Log in"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleSignUp}
            disabled={loading}
          >
            Sign up
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
