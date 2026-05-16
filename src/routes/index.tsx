import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Lifecycle } from "@/components/landing/Lifecycle";
import { Privacy } from "@/components/landing/Privacy";
import { UseCases } from "@/components/landing/UseCases";
import { Modes } from "@/components/landing/Modes";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ScrollyVideo } from "@/components/landing/ScrollyVideo";
import { WalletAssist } from "@/components/landing/WalletAssist";
import { Footer } from "@/components/landing/Footer";
import { Noise } from "@/components/fx/Noise";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PayMemo - Add meaning before you sign" },
      { name: "description", content: "PayMemo turns raw wallet transactions into private, verified payment records for payroll, invoices, swaps, bridges, and business accounting." },
      { property: "og:title", content: "PayMemo - Add meaning before you sign" },
      { property: "og:description", content: "Private transaction memory and onchain accounting for stablecoin payments." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Noise />
      <Nav />
      <Hero />
      <WalletAssist />
      <ScrollyVideo />
      <Problem />
      <Lifecycle />
      <Modes />
      <Privacy />
      <UseCases />
      <DashboardPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}
