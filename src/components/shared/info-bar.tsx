"use client";

import Link from "next/link";
import { MapPin, Clock, Ticket } from "lucide-react";
import { motion } from "motion/react";
import { useLocationsStore } from "@/stores/locations-store";
import { useEffect } from "react";

// Fallback data — update these when real info is available
const FALLBACK_LOCATION = "Jaipur, Rajasthan";
const FALLBACK_TIMINGS = "11 AM – 10 PM";

export function InfoBar() {
  const { locations, fetchLocations } = useLocationsStore();

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const featured = locations.find(loc => loc.isFeaturedCountdown && loc.isActive);
  const active = featured ?? locations.find(loc => loc.isActive);

  const locationText = active ? `${active.name}, ${active.city}` : FALLBACK_LOCATION;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-[60px] sm:top-[68px] left-0 right-0 z-40 bg-black/40 backdrop-blur-[18px] border-b border-white/8 py-1.5 px-4 hidden sm:block"
      aria-label="Quick info bar"
    >
      <div className="mx-auto max-w-[1400px] flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
        <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/70 font-body">
          <MapPin className="h-3 w-3 text-accent-yellow shrink-0" />
          <span className="text-white/90 font-medium">{locationText}</span>
        </span>
        <span className="text-white/20 hidden sm:inline">|</span>
        <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/70 font-body">
          <Clock className="h-3 w-3 text-accent-yellow shrink-0" />
          <span className="text-white/90 font-medium">{FALLBACK_TIMINGS}</span>
        </span>
        <span className="text-white/20 hidden sm:inline">|</span>
        <Link
          href="/#book"
          className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-accent-yellow font-semibold font-body hover:text-accent-yellow/80 transition-colors group"
        >
          <Ticket className="h-3 w-3 shrink-0" />
          Book Online
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
