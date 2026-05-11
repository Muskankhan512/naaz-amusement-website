import { Header } from "@/components/shared/header";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}
