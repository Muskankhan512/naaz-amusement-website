"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "@/lib/site";

type Stat = {
  endValue: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { endValue: 80, suffix: "+", label: "Rides & Attractions" },
  { endValue: 18, suffix: "", label: "Acres of Pure Fun" },
  { endValue: 6, suffix: "K+", label: "Google Reviews" },
  { endValue: 100, suffix: "%", label: "Family Happiness" },
];

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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full bg-deep-purple"
    >
      {/* HERO TOP — Photo + wordmark + offer */}
      <div className="relative min-h-[100svh] w-full overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/hero-mela.jpg"
            alt="Naaz Amusement park at night with rides, lights, and crowds"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Gradient overlay to blend into purple */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-deep-purple" />
        </div>

        {/* Center wordmark */}
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4">
          <div className="text-center">
            <h1 className="sr-only">Naaz Amusement</h1>
          </div>

          {/* Offer banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden mt-6 sm:mt-8 w-full max-w-md sm:max-w-lg"
          >
            <Link
              href={site.bookingUrl}
              target="_blank"
              className="group flex flex-col items-center gap-2 sm:gap-3 rounded-2xl border border-accent-yellow/30 bg-deep-purple/60 px-5 py-4 sm:px-8 sm:py-5 backdrop-blur-md transition hover:border-accent-yellow hover:bg-deep-purple/80"
            >
              <span className="font-display text-[clamp(0.85rem,2.5vw,1.5rem)] text-accent-yellow text-center">
                Book your tickets online and
              </span>
              <span className="font-display text-[clamp(1.5rem,4vw,3rem)] text-white text-center">
                Get Flat 20% off*
              </span>
              <span className="mt-1 sm:mt-2 rounded-full bg-red-600 px-5 py-2 sm:px-6 font-display text-[0.7rem] sm:text-[0.8rem] uppercase tracking-wider text-white transition group-hover:bg-red-500">
                BOOK YOUR TICKETS NOW
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            <span className="font-display text-[12px] sm:text-[16px] uppercase tracking-wide text-white">
              SCROLL DOWN
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* HERO BOTTOM — Purple section with copy + stats */}
      <div className="relative z-10 bg-deep-purple px-4 py-14 sm:px-5 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center font-body text-[clamp(0.9rem,1.3vw,1.125rem)] leading-relaxed text-white/90"
          >
            At Naaz Amusement, we don&rsquo;t just build rides. We architect moments that
            make your heart race, your family bond, and your soul feel 10 years
            younger. Welcome to Jaipur&rsquo;s 18-acre universe of pure, unfiltered joy.
          </motion.p>

          {/* Description */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-8 sm:mt-12 max-w-4xl text-center font-display text-[clamp(1.2rem,2.5vw,2rem)] leading-[1.38] tracking-[-0.32px] text-white"
          >
            Naaz Amusement is Rajasthan&rsquo;s premier themed entertainment destination. A
            world-class amusement park designed by renowned architects, spread across
            18 acres of adrenaline, laughter, and wonder.
          </motion.h2>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 sm:mt-16 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-2 sm:gap-3 ${i < stats.length - 1
                  ? "md:border-r md:border-white/15"
                  : ""
                  }`}
              >
                <AnimatedCounter endValue={stat.endValue} suffix={stat.suffix} />
                <span className="font-display text-[clamp(0.7rem,1.2vw,1rem)] uppercase tracking-wide text-white/80 text-center">
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
