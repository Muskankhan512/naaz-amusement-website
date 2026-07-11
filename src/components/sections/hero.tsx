"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { ArrowRight, Ticket, FerrisWheel, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { useContentStore } from "@/stores/content-store";
import { useLocationsStore } from "@/stores/locations-store";
import { useRidesStore } from "@/stores/rides-store";

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
      className="flex flex-col items-center gap-1 mt-8 mb-4 text-white/60 animate-bounce-slow">
      <span className="font-body text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
      <ChevronDown className="h-4 w-4" />
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
        {/* Symmetric smooth wave */}
        <path d="M 0,30 C 360,0 1080,60 1440,30 L 1440,60 L 0,60 Z" fill="url(#waveGrad)" />
        <path d="M 0,30 C 360,0 1080,60 1440,30" fill="none" stroke="rgba(238,167,39,0.15)" strokeWidth="2" />
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

        {/* Center content — padded for navbar top, wave bottom */}
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 text-center pt-[100px] pb-[80px]">

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display uppercase leading-[0.88] tracking-[0.03em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] text-[clamp(2.2rem,11vw,8.5rem)] mb-5">
            {site.name.split(" ").map((word, i) => (
              <span key={word} className={i === 1 ? "block text-accent-yellow drop-shadow-[0_0_20px_rgba(238,167,39,0.3)]" : "block"}>{word}</span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="font-body text-[clamp(0.85rem,2vw,1.1rem)] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] w-full max-w-[90vw] md:max-w-2xl px-2 font-medium mb-5 text-balance">
            Thrilling Rides & Unforgettable Family Fun &mdash;{" "}
            <span className="text-accent-yellow whitespace-nowrap">Sirf Naaz Amusement Mein</span>
          </motion.p>

          {/* Badges */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[12px] font-body font-semibold tracking-wide text-white/85 mb-8">
            {["⭐ Family Friendly", "🎟️ Secure Booking", "🛡️ Safe Rides", "📍 North India's Trusted Operator"].map(item => (
              <span key={item} className="flex items-center gap-1.5 rounded-full bg-black/40 border border-white/10 px-3 py-1.5 backdrop-blur-md">
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex w-full max-w-md flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5">
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

          {/* Countdown */}
          <CountdownTimer />

          {/* Scroll indicator */}
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
