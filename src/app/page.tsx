import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { PlanVisit } from "@/components/sections/plan-visit";
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
        {/* 4. Testimonials — white bg, 2-col reviews */}
        <Testimonials />
        {/* 5. Brand Marquee — NAAZ AMUSEMENT text scroll */}
        <Tour />
        {/* 6. Gallery — polaroid marquee rows */}
        <Gallery />
        {/* 7. Blog / Naaz Amusement Chronicles */}
        <Chronicles />
        {/* 8. CTA — Ready to Rule */}
        <CtaStrip />
        {/* 9. Your Comfort — facility pills */}
        <Facilities />
        {/* 10. FAQ */}
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
