"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Ticket, FerrisWheel } from "lucide-react";
import { site } from "@/lib/site";
import { useContentStore } from "@/stores/content-store";
import { useLocationsStore } from "@/stores/locations-store";
import { useRidesStore } from "@/stores/rides-store";

/* ─── Ride Preview Card ────────────────────────────────────────────────── */
const RIDE_ICONS: Record<string, string> = {
  default: "🎡",
  "wheel": "🎡",
  "roller": "🎢",
  "coaster": "🎢",
  "boat": "🚤",
  "car": "🏎️",
  "swing": "🎠",
  "drop": "⬇️",
  "train": "🚂",
  "bumper": "💥",
  "slide": "🎿",
  "tower": "🗼",
};

function getRideIcon(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(RIDE_ICONS)) {
    if (key !== "default" && lower.includes(key)) return icon;
  }
  return RIDE_ICONS.default;
}

function RidePreviewCards() {
  const { rides, fetchRides } = useRidesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (rides.length === 0) fetchRides();
  }, [rides.length, fetchRides]);

  const previewRides = mounted && rides.length > 0
    ? rides.slice(0, 3)
    : [
        { name: "Giant Wheel", slug: "giant-wheel" },
        { name: "Roller Coaster", slug: "roller-coaster" },
        { name: "Bumper Cars", slug: "bumper-cars" },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.6 }}
      className="mt-8 flex flex-wrap gap-3 justify-center"
    >
      {previewRides.map((ride, i) => (
        <motion.div
          key={ride.slug}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.1, type: "spring", bounce: 0.3 }}
          className="flex items-center gap-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-xl px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:bg-white/15 hover:border-accent-yellow/50 hover:shadow-[0_0_16px_rgba(238,167,39,0.25)] transition-all duration-300 cursor-default"
        >
          <span className="text-lg leading-none">{getRideIcon(ride.name)}</span>
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

  useEffect(() => {
    setMounted(true);
    if (locations.length === 0) fetchLocations();
  }, [locations.length, fetchLocations]);

  const featuredMela = locations.find(loc => loc.isFeaturedCountdown);

  useEffect(() => {
    if (!featuredMela) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(featuredMela.startDate).getTime();
      const difference = start - now;

      if (difference <= 0) {
        setTimeLeft(null);
        clearInterval(timer);
      } else {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [featuredMela]);

  if (!mounted || !featuredMela) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="mt-12 flex flex-col items-center"
    >
      <h3 className="font-display text-lg sm:text-xl text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-4 uppercase tracking-widest">
        🎉 {featuredMela.name} Starts In
      </h3>

      {!timeLeft ? (
        <div className="bg-accent-yellow/20 border border-accent-yellow backdrop-blur-md px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(238,167,39,0.5)]">
          <span className="font-display text-2xl text-accent-yellow uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Mela Live Now!</span>
        </div>
      ) : (
        <div className="flex gap-3 sm:gap-5 text-center">
          {[
            { label: "Days", value: timeLeft.d },
            { label: "Hours", value: timeLeft.h },
            { label: "Minutes", value: timeLeft.m },
            { label: "Seconds", value: timeLeft.s }
          ].map((time) => (
            <div key={time.label} className="flex flex-col items-center">
              <div className="relative w-14 h-16 sm:w-16 sm:h-20 bg-black/50 border border-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6)] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={time.value}
                    initial={{ y: -20, opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: 20, opacity: 0, rotateX: -90 }}
                    transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                    className="absolute font-mono-ibm text-2xl sm:text-3xl font-bold text-accent-yellow drop-shadow-[0_0_8px_rgba(238,167,39,0.8)]"
                  >
                    {time.value.toString().padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-widest mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{time.label}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Twinkling Stars (CSS-only, desktop only) ─────────────────────────── */
function StarField() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 85}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() > 0.7 ? 2.5 : 1.5,
    delay: `${(Math.random() * 4).toFixed(2)}s`,
    duration: `${(2.5 + Math.random() * 2.5).toFixed(2)}s`,
  }));

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block" aria-hidden>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ─── AnimatedCounter ───────────────────────────────────────────────────── */
function AnimatedCounter({ endValue, suffix }: { endValue: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * endValue));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [endValue]);

  return (
    <span ref={ref} className="font-display text-[clamp(2rem,5vw,4.75rem)] leading-none text-accent-yellow">
      {count}{suffix}
    </span>
  );
}

/* ─── Hero Wave SVG ─────────────────────────────────────────────────────── */
function HeroWave() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 leading-[0] pointer-events-none">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[50px] sm:h-[70px] md:h-[80px] block"
        aria-hidden
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#210C6D" />
            <stop offset="50%" stopColor="#2D1A7A" />
            <stop offset="100%" stopColor="#210C6D" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,10 1080,45 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z"
          fill="url(#waveGrad)"
        />
        {/* Glow line along the wave */}
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,10 1080,45 C1260,80 1350,20 1440,40"
          fill="none"
          stroke="rgba(238,167,39,0.15)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

/* ─── Main Hero Export ──────────────────────────────────────────────────── */
export function Hero() {
  const { content, fetchContent } = useContentStore();
  const hero = content.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Mouse parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(hover: none)").matches;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const bgTranslateX = mousePos.x * -8;
  const bgTranslateY = mousePos.y * -8;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-deep-purple"
    >
      {/* HERO TOP — Photo + wordmark + offer */}
      <div
        className="relative min-h-[100svh] w-full overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Background photo with parallax */}
        <div className="absolute inset-0 scale-[1.06]">
          <div
            ref={bgRef}
            className="absolute inset-0 transition-transform duration-100 ease-linear"
            style={{ transform: `translate(${bgTranslateX}px, ${bgTranslateY}px)` }}
          >
            <Image
              src="/hero-mela-v3.png"
              alt="Naaz Amusement park at night with rides, lights, and crowds"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-deep-purple/70 to-accent-yellow/30 z-[1]" />
          <div
            aria-hidden
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, transparent 30%, rgba(33,12,109,0.5) 100%)",
            }}
          />
        </div>

        {/* Twinkling stars */}
        <StarField />

        {/* Center wordmark + CTAs */}
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">

          {/* Wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-display uppercase leading-[0.92] tracking-[0.02em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)] text-[clamp(2.2rem,11vw,8.5rem)]"
          >
            {site.name.split(" ").map((word, i) => (
              <span key={word} className={i === 1 ? "block text-accent-yellow" : "block"}>
                {word}
              </span>
            ))}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-6 font-body text-[clamp(0.95rem,2.5vw,1.3rem)] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-2xl font-medium"
          >
            North India ke Sabse Bade Mele Aur Rides Ka Anubhav Kijiye
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[12px] sm:text-[14px] font-semibold tracking-wide text-white/90"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-black/40 border border-white/10 px-4 py-1.5 backdrop-blur-md">
              ⭐ 20+ Rides
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-black/40 border border-white/10 px-4 py-1.5 backdrop-blur-md">
              🎟️ Online Tickets
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-black/40 border border-white/10 px-4 py-1.5 backdrop-blur-md">
              👨‍👩‍👧 Family Entertainment
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
          >
            <Link
              href={site.bookingUrl}
              className="group flex h-[3.25rem] w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent-yellow to-[#FDE047] px-8 font-display text-sm font-semibold uppercase tracking-widest text-[#0A0514] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(238,167,39,0.5)]"
            >
              <Ticket className="h-4 w-4" />
              Book Tickets
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/attractions"
              className="group flex h-[3.25rem] w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border-2 border-white/80 bg-white/5 backdrop-blur-[18px] px-8 font-display text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/15 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <FerrisWheel className="h-4 w-4" />
              Explore Rides
            </Link>
          </motion.div>

          {/* Ride preview cards */}
          <RidePreviewCards />

          {/* Countdown */}
          <CountdownTimer />
        </div>

        {/* Wave at bottom of hero */}
        <HeroWave />
      </div>

      {/* HERO BOTTOM — Purple section with copy + stats */}
      <div className="relative z-10 bg-deep-purple px-4 py-14 sm:px-5 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center font-body text-[clamp(0.9rem,1.3vw,1.125rem)] leading-relaxed text-white/90"
          >
            {hero.body}
          </motion.p>

          {/* Description */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-8 sm:mt-12 max-w-4xl text-center font-display text-[clamp(1.1rem,2.5vw,2rem)] leading-[1.38] tracking-[-0.32px] text-white"
          >
            {hero.description}
          </motion.h2>

          {/* Stats row - Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { icon: "🎡", value: "20+", label: "RIDES" },
              { icon: "🎟️", value: "40K+", label: "VISITORS" },
              { icon: "🎊", value: "25+", label: "EVENTS" },
              { icon: "⭐", value: "4.9", label: "RATING" }
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-[18px] p-6 shadow-2xl transition hover:bg-white/10 hover:border-accent-yellow/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(238,167,39,0.15)] group"
              >
                <span className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(238,167,39,0.5)]">{stat.icon}</span>
                <span className="font-display text-2xl sm:text-3xl lg:text-4xl leading-none text-accent-yellow tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {stat.value}
                </span>
                <span className="font-display text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.2em] text-white/80 font-bold mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Fixed sun accent — top right */}
      <div className="pointer-events-none fixed right-5 top-24 z-30 hidden md:block">
        <SunBurst className="h-12 w-12 text-accent-yellow drop-shadow-[0_4px_18px_rgba(238,167,39,0.6)]" />
      </div>
    </section>
  );
}

function SunBurst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="22"
          y="2"
          width="4"
          height="10"
          rx="2"
          transform={`rotate(${i * 30} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="8" />
    </svg>
  );
}
