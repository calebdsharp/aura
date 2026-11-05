"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTheme } from "./theme-provider";

export const PersonalizeForm = () => {
  const { setTheme } = useTheme();
  const [interests, setInterests] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePersonalize = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setReason("");

    try {
      const response = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests }),
      });
      if (!response.ok) throw new Error("Personalization failed");

      const data = await response.json();
      await setTheme(data.theme);
      setReason(data.reason || "");
    } catch {
      setError("Could not personalize. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePersonalize} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="interests">What are you into?</Label>
        <Input
          id="interests"
          value={interests}
          onChange={(event) => setInterests(event.target.value)}
          placeholder="outdoors, cozy, warm cabin"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Personalizing..." : "Personalize my theme"}
      </Button>
      {reason && (
        <p className="rounded-md bg-muted px-3 py-2 text-sm">
          Theme updated: {reason}
        </p>
      )}
      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  );
};
