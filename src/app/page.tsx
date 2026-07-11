import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { PlanVisit } from "@/components/sections/plan-visit";
import { Rides } from "@/components/sections/rides";
import { EventPackages } from "@/components/sections/event-packages";
import { ActiveLocations } from "@/components/sections/active-locations";

import { Gallery } from "@/components/sections/gallery";
import { Chronicles } from "@/components/sections/chronicles";
import { CtaStrip } from "@/components/sections/cta-strip";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 1. Hero — photo + wordmark + stats */}
        <Hero />

        {/* 3. Plan Your Visit — 4 steps */}
        <PlanVisit />
        {/* 3.5. Featured Rides — Masonry layout */}
        <Rides />
        {/* 4. Active Locations & Fair Finder */}
        <ActiveLocations />

        {/* 7. Gallery — polaroid marquee rows */}
        <Gallery />
        {/* 8. Blog / Naaz Amusement Chronicles */}
        <Chronicles />
        {/* 9. Curated Event Packages */}
        <EventPackages />
        {/* 10. Final CTA */}
        <CtaStrip />
        {/* 12. FAQ */}
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
