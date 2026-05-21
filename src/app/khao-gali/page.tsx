"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { motion } from "motion/react";
import { UtensilsCrossed, Flame, IceCream, Coffee, ShieldCheck, Heart, Sparkles, Clock, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

const foodZones = [
  {
    title: "Rajasthani Darbar",
    description: "Authentic, heritage Rajasthani flavors prepared by traditional Khansamas.",
    items: ["Dal Baati Churma", "Ker Sangri", "Mirchi Bada", "Mawa Kachori"],
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=800&auto=format&fit=crop",
    icon: Flame,
  },
  {
    title: "Chatkara Street",
    description: "Tangy, sweet, and spicy street foods of India curated under one roof.",
    items: ["Dahi Puri & Pani Puri", "Aloo Tikki Chat", "Papdi Chat", "Pav Bhaji"],
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
    icon: UtensilsCrossed,
  },
  {
    title: "Mithaas Halwai",
    description: "Decadent Indian sweets and cool beverages to beat the heat.",
    items: ["Jaipuri Jalebi & Rabdi", "Malpua", "Kesar Kulhad Lassi", "Kulfi Falooda"],
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
    icon: IceCream,
  },
  {
    title: "Global Express",
    description: "Modern fast food and beverages for teenagers and children.",
    items: ["Wood-fired Pizza", "Garlic Bread", "Loaded Nachos", "Chilled Mocktails"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    icon: Coffee,
  },
];

export default function KhaoGaliPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-deep-purple text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] h-[50%] w-[45%] rounded-full bg-orange-600/10 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[-10%] h-[50%] w-[45%] rounded-full bg-yellow-600/10 blur-[130px] mix-blend-screen" />
      </div>

      <Header />

      <main className="relative z-10 flex-1 pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Hero Banner Section */}
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-accent-yellow animate-pulse" />
                CELEBRATION OF FLAVORS
              </span>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-wide text-white">
                Welcome to <br />
                <span className="text-accent-yellow">Naaz Khao Gali</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/70 max-w-xl">
                A bustling food street spread across the heart of the park, offering over 25 unique food stalls. Relish hot Jaipuri Kachoris, giant Kesar Kulhad Lassis, wood-fired pizzas, and street delicacies curated with 100% pure ingredients.
              </p>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2 border-r border-white/10 pr-6">
                  <Clock className="h-5 w-5 text-accent-yellow" />
                  <div className="text-xs">
                    <span className="block text-white/40 font-display uppercase tracking-widest">TIMINGS</span>
                    <span className="font-semibold">11:00 AM - 10:00 PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent-yellow" />
                  <div className="text-xs">
                    <span className="block text-white/40 font-display uppercase tracking-widest">HYGIENE</span>
                    <span className="font-semibold">100% Vegetarian</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Featured Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/3] w-full rounded-[2rem] border border-white/10 bg-white/[0.01] p-4 shadow-2xl overflow-hidden group"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
                  alt="Naaz Khao Gali street food"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 95vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="font-display text-2xl text-white">Rajasthan&apos;s Culinary Center</span>
                  <span className="block text-xs text-accent-yellow mt-1">Stalls operational all days of the week</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Food Zones Grid */}
          <div className="mt-32">
            <div className="text-center max-w-xl mx-auto">
              <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow">
                OUR MENU SECTIONS
              </span>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-none tracking-wide text-white">
                Explore the Food Zones
              </h2>
              <p className="mt-4 text-xs text-white/50 leading-relaxed">
                From local Rajasthani delicacies to global favorites, find something delicious for every member of your family.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              {foodZones.map((zone, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 p-5 flex flex-col sm:flex-row gap-6 shadow-xl"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] w-full sm:w-44 shrink-0 overflow-hidden rounded-[1.2rem]">
                    <Image
                      src={zone.image}
                      alt={zone.title}
                      fill
                      sizes="(min-width: 640px) 176px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Zone description */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-yellow/10 text-accent-yellow">
                          <zone.icon className="h-4 w-4" />
                        </div>
                        <h3 className="font-display text-lg tracking-wide text-white group-hover:text-accent-yellow transition">
                          {zone.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-white/50">
                        {zone.description}
                      </p>

                      {/* Items Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {zone.items.map((item, i) => (
                          <span
                            key={i}
                            className="inline-block rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] text-white/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Quality Standards */}
          <div className="mt-32 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 backdrop-blur-md">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
              <div>
                <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow">
                  TRUST & SAFETY
                </span>
                <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-wide text-white">
                  Zero-Compromise Food Quality
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-white/60">
                  Your safety and health are our highest priorities. All stalls at Khao Gali adhere to strict culinary standards:
                </p>
                
                <ul className="mt-6 space-y-4 text-xs text-white/50">
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-yellow" />
                    100% Vegetarian preparations across all stalls.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-yellow" />
                    Reverse Osmosis (R.O.) filtered drinking water used in all cooking and beverages.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-yellow" />
                    Daily sanitization checks of stalls, cooking utensils, and waste disposal units.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-yellow" />
                    Trained chefs wearing safety masks, hairnets, and gloves at all times.
                  </li>
                </ul>
              </div>

              {/* Promo box */}
              <div className="rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/5 to-transparent" />
                <h4 className="font-display text-xl text-white">Planning a Group Meal?</h4>
                <p className="mt-3 text-xs leading-relaxed text-white/40">
                  If you are visiting with a school group, corporate excursion, or family party of 20+ people, we offer customized food combo packages at discounted rates!
                </p>
                <div className="mt-8">
                  <Link
                    href={site.bookingUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-yellow px-6 py-3 text-xs font-display tracking-widest text-deep-purple transition hover:scale-[1.02]"
                  >
                    PLAN YOUR GROUP DINING
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
