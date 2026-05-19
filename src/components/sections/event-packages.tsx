"use client";

import { motion } from "motion/react";
import { Check, Calendar, ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";
import Link from "next/link";

type Package = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  duration: string;
  icon: any;
  themeColor: string;
  shadowColor: string;
  highlightText?: string;
  features: string[];
  bestFor: string;
};

const packages: Package[] = [
  {
    id: "mela-carnival",
    name: "Mega Mela & Carnival",
    tagline: "The ultimate amusement setup for massive public events and city festivals.",
    price: "₹ 2.5L",
    duration: "per day",
    icon: Zap,
    themeColor: "text-accent-yellow border-accent-yellow/20 hover:border-accent-yellow/50",
    shadowColor: "rgba(238, 167, 39, 0.15)",
    highlightText: "Most Popular",
    features: [
      "3 High-Thrill Rides (Striker, Sky Scrambler, Roller Coaster)",
      "2 Family Rides (Bumper Cars, Wave Pool)",
      "Full technical operator crew & safety supervisors",
      "Custom decorative lighting & entrance setup",
      "Complimentary transport within Jaipur limits"
    ],
    bestFor: "Public Melas, Carnivals, Corporate Family Days"
  },
  {
    id: "royal-wedding",
    name: "Royal Celebration",
    tagline: "Add grandeur to sangeets, weddings, and premium family gatherings.",
    price: "₹ 1.8L",
    duration: "per day",
    icon: ShieldCheck,
    themeColor: "text-pink-500 border-pink-500/20 hover:border-pink-500/50",
    shadowColor: "rgba(236, 72, 153, 0.15)",
    features: [
      "1 Extreme Thrill Ride (Sky Scrambler or Striker)",
      "2 Family Adventures (Bumper Cars & Sky Cycling)",
      "Dedicated guest relations manager",
      "LED illumination setup for nighttime sangeets",
      "Complete site licensing assistance & safety certifications"
    ],
    bestFor: "Grand Weddings, Pre-Wedding Sangeets, VIP Parties"
  },
  {
    id: "corporate-school",
    name: "Corporate & School Outing",
    tagline: "A modular, medium-sized setup perfect for private events and team building.",
    price: "₹ 1.2L",
    duration: "per day",
    icon: Users,
    themeColor: "text-emerald-400 border-emerald-400/20 hover:border-emerald-400/50",
    shadowColor: "rgba(52, 211, 153, 0.15)",
    features: [
      "2 Family-friendly Rides (Lazy River & Bumper Cars)",
      "1 Adventure Attraction (Zip Line or Sky Cycling)",
      "Trained safety wardens on-site",
      "Setup completion in under 24 hours",
      "Flexible booking dates"
    ],
    bestFor: "Corporate Retreats, School Trips, Community Fairs"
  }
];

export function EventPackages() {
  return (
    <section id="packages" className="relative isolate overflow-hidden bg-[#0A0514] py-20 sm:py-28 lg:py-32">
      {/* Decorative Blur Orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-yellow/[0.02] blur-[150px]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow"
          >
            All-Inclusive Solutions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none tracking-wide text-white"
          >
            Curated Event Packages
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
            Choose from our pre-configured setups tailored for different scale celebrations and festivals. Custom packages are also available on request.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex flex-col justify-between rounded-[2rem] border bg-white/[0.01] p-8 backdrop-blur-2xl transition-all duration-300 hover:bg-white/[0.03] ${pkg.themeColor}`}
                style={{
                  boxShadow: `0 10px 30px -10px ${pkg.shadowColor}`
                }}
              >
                {pkg.highlightText && (
                  <span className="absolute -top-3 right-6 rounded-full bg-accent-yellow px-3 py-1 font-display text-[9px] uppercase tracking-wider text-deep-purple font-semibold shadow-md">
                    {pkg.highlightText}
                  </span>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg tracking-wide text-white">
                        {pkg.name}
                      </h3>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest block font-medium mt-0.5">
                        Best for: {pkg.bestFor}
                      </span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-semibold text-white">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-white/40 uppercase tracking-wider">
                      / {pkg.duration}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-white/50">
                    {pkg.tagline}
                  </p>

                  {/* Features List */}
                  <div className="mt-8 space-y-3.5 border-t border-white/5 pt-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-accent-yellow shrink-0 mt-0.5" />
                        <span className="text-xs leading-relaxed text-white/70">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-4">
                  <Link
                    href={`/book?package=${pkg.id}`}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white text-white hover:text-deep-purple border border-white/10 hover:border-white text-xs font-display tracking-widest uppercase transition-all duration-300"
                  >
                    SELECT PACKAGE
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/919929068065?text=Hello%20Naaz%20Amusement,%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-3 text-[10px] text-white/40 hover:text-white transition uppercase font-display tracking-wider"
                  >
                    Or Inquiry on WhatsApp
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
