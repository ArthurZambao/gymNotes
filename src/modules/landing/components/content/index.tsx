"use client";

import { Features } from "../features";
import { HeroSection } from "../hero-section";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      <HeroSection />
      <Features />
    </main>
  );
}