"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { ArrowRight, Ticket, FerrisWheel, ChevronDown, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { useContentStore } from "@/stores/content-store";
import { useLocationsStore } from "@/stores/locations-store";
import { useRidesStore } from "@/stores/rides-store";

/* ─── Ride Icons ─────────────────────────────────────────────────────────── */
const RIDE_ICONS: Record<string, string> = {
  default: "🎡", wheel: "🎡", roller: "🎢", coaster: "🎢",
  boat: "🚤", car: "🏎️", swing: "🎠", drop: "⬇️",
  train: "🚂", bumper: "💥", slide: "🎿", tower: "🗼",
};
function getRideIcon(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(RIDE_ICONS)) {
    if (key !== "default" && lower.includes(key)) return icon;
  }
  return RIDE_ICONS.default;
}

/* ─── Ride Preview Chips ─────────────────────────────────────────────────── */
function RidePreviewCards() {
  const { rides, fetchRides } = useRidesStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); if (rides.length === 0) fetchRides(); }, [rides.length, fetchRides]);

  const previewRides = mounted && rides.length > 0 ? rides.slice(0, 3) : [
    { name: "Giant Wheel", slug: "giant-wheel" },
    { name: "Roller Coaster", slug: "roller-coaster" },
    { name: "Bumper Cars", slug: "bumper-cars" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.6 }}
      className="mt-5 flex flex-wrap gap-3 justify-center">
      {previewRides.map((ride, i) => (
        <motion.div key={ride.slug}
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.1, type: "spring", bounce: 0.3 }}
          className="group flex items-center gap-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-xl px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:bg-white/15 hover:border-accent-yellow/50 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,165,0,0.3)] transition-all duration-300 cursor-default">
          <span className="text-lg leading-none transition-transform duration-300 group-hover:rotate-12">
            {getRideIcon(ride.name)}
          </span>
          <span className="font-display text-xs sm:text-sm uppercase tracking-widest text-white/90 whitespace-nowrap">
            {ride.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Countdown Timer ───────────────────────────────────────────────────── */
function CountdownTimer() {
  const { locations, fetchLocations } = useLocationsStore();
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); if (locations.length === 0) fetchLocations(); }, [locations.length, fetchLocations]);
  const featuredMela = locations.find(loc => loc.isFeaturedCountdown);
  useEffect(() => {
    if (!featuredMela) return;
    const timer = setInterval(() => {
      const diff = new Date(featuredMela.startDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft(null); clearInterval(timer); return; }
      setTimeLeft({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    }, 1000);
    return () => clearInterval(timer);
  }, [featuredMela]);
  if (!mounted || !featuredMela) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="mt-10 flex flex-col items-center">
      <h3 className="font-display text-base sm:text-lg text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-4 uppercase tracking-widest">
        🎉 {featuredMela.name} Starts In
      </h3>
      {!timeLeft ? (
        <div className="bg-accent-yellow/20 border border-accent-yellow backdrop-blur-md px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(238,167,39,0.5)]">
          <span className="font-display text-2xl text-accent-yellow uppercase tracking-widest">Mela Live Now!</span>
        </div>
      ) : (
        <div className="flex gap-3 sm:gap-5 text-center">
          {[{ label: "Days", value: timeLeft.d }, { label: "Hours", value: timeLeft.h }, { label: "Mins", value: timeLeft.m }, { label: "Secs", value: timeLeft.s }].map((t) => (
            <div key={t.label} className="flex flex-col items-center">
              <div className="relative w-14 h-16 sm:w-16 sm:h-20 bg-black/50 border border-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6)] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span key={t.value} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                    className="absolute font-mono-ibm text-2xl sm:text-3xl font-bold text-accent-yellow drop-shadow-[0_0_8px_rgba(238,167,39,0.8)]">
                    {t.value.toString().padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-widest mt-2">{t.label}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Enhanced Star Field ───────────────────────────────────────────────── */
type Star = { id: number; top: string; left: string; size: number; opacity: number; delay: string; duration: string };

function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random positions client-side only to avoid hydration mismatch
    setStars(
      Array.from({ length: 50 }, (_, i) => {
        const tier = i % 3;
        return {
          id: i,
          top: `${5 + Math.random() * 80}%`,
          left: `${Math.random() * 100}%`,
          size: tier === 0 ? 1 : tier === 1 ? 2 : 3,
          opacity: parseFloat((0.3 + Math.random() * 0.5).toFixed(2)),
          delay: `${(Math.random() * 5).toFixed(2)}s`,
          duration: `${(2 + Math.random() * 4).toFixed(2)}s`,
        };
      })
    );
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block" aria-hidden>
      {stars.map((s) => (
        <div key={s.id} className="absolute rounded-full bg-white animate-twinkle"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity, animationDelay: s.delay, animationDuration: s.duration }} />
      ))}
    </div>
  );
}

/* ─── Ambient Glow Orbs ─────────────────────────────────────────────────── */
function AmbienceOrbs() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block overflow-hidden" aria-hidden>
      {/* Magenta orb drift */}
      <div className="absolute w-64 h-64 rounded-full opacity-[0.07] animate-drift"
        style={{ background: "radial-gradient(circle, rgba(143,1,119,1) 0%, transparent 70%)", top: "20%", left: "10%", animationDelay: "0s" }} />
      {/* Gold orb drift */}
      <div className="absolute w-48 h-48 rounded-full opacity-[0.06] animate-drift"
        style={{ background: "radial-gradient(circle, rgba(238,167,39,1) 0%, transparent 70%)", bottom: "15%", right: "8%", animationDelay: "4s", animationDirection: "alternate-reverse" }} />
      {/* Subtle fog layer */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.8) 0%, transparent 60%)", animation: "drift 20s ease-in-out infinite alternate" }} />
    </div>
  );
}

/* ─── Scroll Indicator ───────────────────────────────────────────────────── */
function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  if (!visible) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="flex flex-col items-center gap-1 text-white/50 mt-8 animate-bounce-slow">
      <span className="font-body text-[11px] tracking-[0.2em] uppercase">Scroll</span>
      <ChevronDown className="h-4 w-4" />
    </motion.div>
  );
}

/* ─── Floating Glass Info Card ───────────────────────────────────────────── */
function HeroInfoCard() {
  const { locations } = useLocationsStore();
  const featured = locations.find(l => l.isFeaturedCountdown && l.isActive) ?? locations.find(l => l.isActive);
  const locationName = featured?.name ?? null;
  if (!locationName) return null;
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-6 bottom-28 z-20 hidden lg:block w-[200px]"
      style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: "18px 16px" }}>
      <p className="font-display text-xs text-accent-yellow uppercase tracking-widest mb-3">🎡 Current Mela</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/80 text-[11px] font-body">
          <Clock className="h-3 w-3 text-accent-yellow shrink-0" />
          <span>11:00 AM – 10:00 PM</span>
        </div>
        <div className="flex items-center gap-2 text-white/80 text-[11px] font-body">
          <MapPin className="h-3 w-3 text-accent-yellow shrink-0" />
          <span>{locationName}</span>
        </div>
      </div>
      <Link href={site.bookingUrl}
        className="mt-4 flex items-center justify-center gap-1 w-full rounded-full bg-accent-yellow text-[#0A0514] font-display text-[11px] uppercase tracking-widest py-2 hover:bg-accent-yellow/90 transition">
        <Ticket className="h-3 w-3" /> Book Now
      </Link>
    </motion.div>
  );
}

/* ─── Hero Wave ──────────────────────────────────────────────────────────── */
function HeroWave() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 leading-[0] pointer-events-none">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[40px] sm:h-[50px] md:h-[60px] block" aria-hidden>
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#210C6D" /><stop offset="50%" stopColor="#2D1A7A" /><stop offset="100%" stopColor="#210C6D" />
          </linearGradient>
        </defs>
        {/* Asymmetric wave — left flat, right curves */}
        <path d="M0,55 L400,55 C600,55 700,10 900,25 C1100,40 1300,15 1440,30 L1440,60 L0,60 Z" fill="url(#waveGrad)" />
        <path d="M0,55 L400,55 C600,55 700,10 900,25 C1100,40 1300,15 1440,30" fill="none" stroke="rgba(238,167,39,0.12)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* ─── Main Hero ──────────────────────────────────────────────────────────── */
export function Hero() {
  const { content, fetchContent } = useContentStore();
  const hero = content.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);
  useEffect(() => { isTouchDevice.current = window.matchMedia("(hover: none)").matches; }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  return (
    <section ref={sectionRef} className="relative w-full bg-deep-purple">
      <div className="relative min-h-[100svh] w-full overflow-hidden" onMouseMove={handleMouseMove}>

        {/* Background with parallax */}
        <div className="absolute inset-0 scale-[1.06]">
          <div ref={bgRef} className="absolute inset-0 transition-transform duration-100 ease-linear"
            style={{ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` }}>
            <Image src="/hero-mela-v3.png" alt="Naaz Amusement mela at night" fill priority sizes="100vw" className="object-cover object-center" />
          </div>
          {/* Layered gradient overlay — point 11 */}
          <div className="absolute inset-0 z-[1]" style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(75,0,130,0.4) 35%, transparent 60%, rgba(255,140,0,0.15) 100%)"
          }} />
          <div aria-hidden className="absolute inset-0 z-[1]" style={{
            backgroundImage: "radial-gradient(ellipse at center, transparent 30%, rgba(33,12,109,0.5) 100%)"
          }} />
        </div>

        <StarField />
        <AmbienceOrbs />
        <HeroInfoCard />

        {/* Center content */}
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 text-center pt-[120px] sm:pt-[100px] md:pt-[90px]">

          {/* Title — point 2 */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display uppercase leading-[0.88] tracking-[0.02em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] text-[clamp(2.2rem,11vw,8.5rem)] mb-8">
            {site.name.split(" ").map((word, i) => (
              <span key={word} className={i === 1 ? "block text-accent-yellow" : "block"}>{word}</span>
            ))}
          </motion.h1>

          {/* Subtitle — point 8 */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="font-body text-[clamp(0.9rem,2.2vw,1.2rem)] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-2xl font-medium mb-6">
            Thrilling Rides & Unforgettable Family Fun —{" "}
            <span className="text-accent-yellow">Sirf Naaz Amusement Mein</span>
          </motion.p>

          {/* Feature highlights — only verified facts */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-[13px] font-body font-semibold tracking-wide text-white/85 mb-8">
            {["🎡 20+ Thrilling Rides", "🎟 Online Booking"].map(item => (
              <span key={item} className="flex items-center gap-1.5 rounded-full bg-black/40 border border-white/10 px-3 py-1.5 sm:px-4 backdrop-blur-md">
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons — point 7 */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex w-full max-w-md flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5 mb-10">
            <Link href={site.bookingUrl}
              className="group flex h-[3.25rem] w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent-yellow to-[#FDE047] px-8 font-display text-sm font-semibold uppercase tracking-widest text-[#0A0514] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(238,167,39,0.5)]">
              <Ticket className="h-4 w-4" />
              Book Tickets
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[5px]" />
            </Link>
            <Link href="/attractions"
              className="group flex h-[3.25rem] w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border-2 border-white/80 bg-white/5 backdrop-blur-[18px] px-8 font-display text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-[5px] hover:border-white hover:bg-white/15 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
              <FerrisWheel className="h-4 w-4" />
              Explore Rides
            </Link>
          </motion.div>

          {/* Ride chips — point 4 */}
          <RidePreviewCards />

          {/* Countdown */}
          <CountdownTimer />

          {/* Scroll indicator — point 13 */}
          <ScrollIndicator />
        </div>

        {/* Wave — point 6 */}
        <HeroWave />
      </div>

      {/* HERO BOTTOM — Stats */}
      <div className="relative z-10 bg-deep-purple px-4 py-14 sm:px-5 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
            className="text-center font-body text-[clamp(0.9rem,1.3vw,1.125rem)] leading-relaxed text-white/90">
            {hero.body}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-8 sm:mt-12 max-w-4xl text-center font-display text-[clamp(1.1rem,2.5vw,2rem)] leading-[1.38] text-white">
            {hero.description}
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[{ icon: "🎡", value: "20+", label: "RIDES" }, { icon: "🎟️", value: "40K+", label: "VISITORS" }, { icon: "🎊", value: "25+", label: "EVENTS" }].map((stat) => (
              <div key={stat.label}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-[18px] p-6 shadow-2xl transition hover:bg-white/10 hover:border-accent-yellow/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(238,167,39,0.15)] group">
                <span className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                <span className="font-display text-2xl sm:text-3xl lg:text-4xl leading-none text-accent-yellow">{stat.value}</span>
                <span className="font-display text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.2em] text-white/80 font-bold mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
