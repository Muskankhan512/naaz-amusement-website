"use client";

import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { motion } from "motion/react";
import { MapPin, Shield, Star, Users, Award, Landmark } from "lucide-react";
import { FerrisWheel } from "@/components/decor/ferris-wheel";
import { site } from "@/lib/site";
import Link from "next/link";

const stats = [
  { label: "Years of Legacy", value: `40+` },
  { label: "Rides & Attractions", value: site.ridesCount },
  { label: "Trusted Since", value: site.trustedSince },
  { label: "States Covered", value: "3" },
];

const pillars = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every ride undergoes rigorous daily safety inspections and complies with international safety standards.",
  },
  {
    icon: Star,
    title: "Absolute Adrenaline",
    description: "From thrilling high-speed rides to family favourites, we deliver top-tier fun for every kind of adventurer.",
  },
  {
    icon: Users,
    title: "Memories For All",
    description: "Multi-generational experiences where children, teens, parents, and grandparents find joy.",
  },
  {
    icon: Landmark,
    title: "Cultural Pride",
    description: "Celebrating Rajasthan's rich culture with festive lights, vibrant themes, and the true spirit of mela traditions.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-deep-purple text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] h-[50%] w-[40%] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[-10%] h-[50%] w-[40%] rounded-full bg-emerald-600/10 blur-[130px]" />
      </div>

      <Header />

      <main className="relative z-10 flex-1 pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow">
                WELCOME TO NAAZ AMUSEMENT
              </span>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-wide text-white">
                North India's Favourite <br />
                <span className="text-accent-yellow">Traveling Carnival</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/70 max-w-xl">
                For 40 years, Naaz Amusement has been lighting up melas, fairs, and city festivals across Rajasthan, Delhi, and Uttar Pradesh. We don't have a fixed address — we bring the carnival to your city.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={site.bookingUrl}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-accent-yellow px-8 text-xs font-display tracking-widest text-deep-purple transition hover:scale-[1.02] shadow-[0_0_15px_rgba(238,167,39,0.25)]"
                >
                  BOOK SETUP NOW
                </Link>
                <Link
                  href="/attractions"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-xs font-display tracking-widest text-white transition hover:bg-white/10"
                >
                  EXPLORE ATTRACTIONS
                </Link>
              </div>
            </motion.div>

            {/* Floating Ferris Wheel illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[360px] md:max-w-[420px] aspect-square rounded-full border border-white/5 bg-white/[0.01] p-8 shadow-2xl backdrop-blur-sm relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-magenta/10 via-transparent to-accent-yellow/5 rounded-full" />
                <FerrisWheel className="w-full h-full text-accent-yellow" spokes={12} />
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 backdrop-blur-md"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-accent-yellow">
                  {stat.value}
                </span>
                <span className="mt-2 block font-display text-xs uppercase tracking-widest text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* History / Mission */}
          <div className="mt-32 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow">
                OUR HISTORY
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-wide">
                A 40-Year Journey Across North India
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                1986 se, Naaz Amusement Rajasthan, Delhi aur Uttar Pradesh ke sabse bade melas aur carnivals mein ek jana-mana naam raha hai &mdash; North India ke sabse trusted traveling ride operators mein se ek. Chhote se joyrides ke collection se shuru hokar, aaj hum har saal apni 20+ rides Dussehra melas aur city carnivals mein leke jaate hain, families ke liye yaadgaar pal banate hue.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow">
                OUR MISSION
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-wide">
                Jahan Khushiyon Ki Koi Seema Nahi
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                Hum maante hain ki entertainment logon ko jodne ka ek zariya hai. Hamara mission hai safe aur yaadgaar pal banana — jahan families saath jhool sakein, dost saath hass sakein, aur har visitor ek accha experience leke jaaye.
              </p>
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 flex gap-4 items-start">
                <MapPin className="h-6 w-6 text-accent-yellow shrink-0 mt-1" />
                <div>
                  <h4 className="font-display text-base text-white">Pan North India Operations</h4>
                  <p className="mt-1 text-xs text-white/40 leading-relaxed">
                    We operate across Rajasthan, Delhi, and Uttar Pradesh — setting up rides at major melas, Dussehra grounds, and city carnivals throughout the year.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Pillars */}
          <div className="mt-32">
            <div className="text-center max-w-xl mx-auto">
              <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow">
                THE NAAZ WAY
              </span>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-none tracking-wide text-white">
                Our Core Pillars
              </h2>
              <p className="mt-4 text-xs text-white/50 leading-relaxed">
                Everything we build and operate at Naaz Amusement is rooted in these core principles.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.01] p-8 transition-all hover:bg-white/[0.03] hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-yellow/10 text-accent-yellow">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-lg tracking-wide text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/50">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* The Family Section */}
          <div className="mt-32">
            <div className="text-center max-w-xl mx-auto">
              <span className="font-display text-xs uppercase tracking-[0.2em] text-accent-yellow">
                THE FAMILY BEHIND NAAZ AMUSEMENT
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-wide text-white">
                Char bhai, ek sapna
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-white/50 leading-relaxed">
                40 saal se families ko khushiyaan dete aa rahe hain.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Imtiyaz Khan", role: "Founder & Owner", image: "/founder.png" },
                { name: "Name Here", role: "Role Here", image: null },
                { name: "Name Here", role: "Role Here", image: null },
                { name: "Salman Khan", role: "Co-Owner", image: "/salman.png" }
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.01] p-6 transition-all hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-1 text-center backdrop-blur-md flex flex-col items-center"
                >
                  <div className="h-28 w-28 rounded-full border border-white/10 bg-[#0A0514] flex items-center justify-center overflow-hidden mb-5 relative group-hover:border-accent-yellow/50 transition-colors">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-display text-lg tracking-wide text-white group-hover:text-accent-yellow transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[10px] sm:text-xs font-display tracking-widest text-white/60 uppercase">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
