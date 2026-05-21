import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { PlanVisit } from "@/components/sections/plan-visit";
import { Rides } from "@/components/sections/rides";
import { EventPackages } from "@/components/sections/event-packages";
import { ActiveLocations } from "@/components/sections/active-locations";
import { Testimonials } from "@/components/sections/testimonials";
import { Tour } from "@/components/sections/tour";
import { Gallery } from "@/components/sections/gallery";
import { Chronicles } from "@/components/sections/chronicles";
import { CtaStrip } from "@/components/sections/cta-strip";
import { Facilities } from "@/components/sections/facilities";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 1. Hero — photo + wordmark + stats */}
        <Hero />
        {/* 2. Signature Experiences — dark teal, sticky scroll */}
        <Portfolio />
        {/* 3. Plan Your Visit — 4 steps */}
        <PlanVisit />
        {/* 3.5. Featured Rides — Masonry layout */}
        <Rides />
        {/* 4. Active Locations & Fair Finder */}
        <ActiveLocations />
        {/* 5. Testimonials — white bg, 2-col reviews */}
        <Testimonials />
        {/* 6. Brand Marquee — NAAZ AMUSEMENT text scroll */}
        <Tour />
        {/* 7. Gallery — polaroid marquee rows */}
        <Gallery />
        {/* 8. Blog / Naaz Amusement Chronicles */}
        <Chronicles />
        {/* 9. Curated Event Packages */}
        <EventPackages />
        {/* 10. Ready to Rule */}
        <CtaStrip />
        {/* 11. Your Comfort — facility pills */}
        <Facilities />
        {/* 12. FAQ */}
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
