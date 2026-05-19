"use client";

import { motion } from "motion/react";

type Facility = {
  label: string;
  icon: string;
};

const facilitiesRow1: Facility[] = [
  { label: "Free Parking", icon: "🅿️" },
  { label: "Clean Washrooms", icon: "🚻" },
  { label: "First Aid", icon: "🏥" },
  { label: "Wheelchair Access", icon: "♿" },
  { label: "Cooling Zones", icon: "❄️" },
  { label: "Restaurants", icon: "🍴" },
  { label: "24/7 Security", icon: "🔒" },
  { label: "Free Wi-Fi", icon: "📶" },
  { label: "ATM Available", icon: "🏧" },
  { label: "Baby Care Room", icon: "👶" },
];

const facilitiesRow2: Facility[] = [
  { label: "Lockers", icon: "🔐" },
  { label: "Gift Shop", icon: "🎁" },
  { label: "Photo Studio", icon: "📸" },
  { label: "Medical Room", icon: "⚕️" },
  { label: "Prayer Room", icon: "🕌" },
  { label: "Drinking Water", icon: "💧" },
  { label: "Lost & Found", icon: "📦" },
  { label: "EV Charging", icon: "⚡" },
  { label: "Info Desk", icon: "ℹ️" },
  { label: "Stroller Rental", icon: "🍼" },
];

export function Facilities() {
  return (
    <section
      id="facilities"
      className="relative isolate overflow-hidden bg-deep-purple py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-[clamp(0.85rem,1.2vw,1.1rem)] uppercase tracking-wide text-accent-yellow"
          >
            Your Comfort
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.17] text-white"
          >
            Everything you need, right inside the kingdom.
          </motion.h2>
        </div>
      </div>

      {/* Scrolling pill rows */}
      <div className="mt-14 space-y-5 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <div className="marquee-mask relative w-full">
          <div className="flex animate-marquee gap-4" style={{ animationDuration: "35s" }}>
            {[...facilitiesRow1, ...facilitiesRow1].map((f, i) => (
              <FacilityPill key={`r1-${i}`} facility={f} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="marquee-mask relative w-full">
          <div className="flex animate-marquee-reverse gap-4" style={{ animationDuration: "38s" }}>
            {[...facilitiesRow2, ...facilitiesRow2].map((f, i) => (
              <FacilityPill key={`r2-${i}`} facility={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilityPill({ facility }: { facility: Facility }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-accent-yellow/40 bg-warm-cream/10 px-6 py-3 backdrop-blur-sm">
      <span className="text-xl">{facility.icon}</span>
      <span className="whitespace-nowrap font-display text-[0.9rem] text-white">
        {facility.label}
      </span>
    </div>
  );
}
