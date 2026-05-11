"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { FerrisWheel } from "@/components/decor/ferris-wheel";
import { MarigoldGarland } from "@/components/decor/marigold";
import { waLink } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="paper-grain relative isolate overflow-hidden bg-cream pt-28 pb-24 md:pt-36 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(214,40,40,0.18), transparent 38%), radial-gradient(circle at 82% 18%, rgba(244,163,0,0.28), transparent 42%), radial-gradient(circle at 50% 100%, rgba(56,102,65,0.16), transparent 55%)",
        }}
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-32 top-1/2 -z-0 hidden -translate-y-1/2 opacity-90 md:block lg:-right-20"
      >
        <FerrisWheel className="w-[640px] lg:w-[760px]" />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="pointer-events-none absolute right-6 top-24 z-0 hidden origin-top md:block"
      >
        <div className={reduce ? "" : "motion-safe:animate-[swing_5.5s_ease-in-out_infinite] origin-top"}>
          <svg width="120" height="200" viewBox="0 0 120 200" aria-hidden>
            <line x1="60" y1="0" x2="38" y2="120" stroke="#1A1A2E" strokeWidth="1.4" />
            <line x1="60" y1="0" x2="82" y2="120" stroke="#1A1A2E" strokeWidth="1.4" />
            <rect x="22" y="120" width="76" height="14" rx="3" fill="#D62828" stroke="#1A1A2E" strokeWidth="1.2" />
            <rect x="26" y="134" width="68" height="38" rx="6" fill="#386641" stroke="#1A1A2E" strokeWidth="1.2" />
            <path d="M22 120 L98 120 L94 132 L26 132 Z" fill="#F4A300" stroke="#1A1A2E" strokeWidth="1" />
            <circle cx="44" cy="153" r="3" fill="#F4A300" />
            <circle cx="60" cy="153" r="3" fill="#F4A300" />
            <circle cx="76" cy="153" r="3" fill="#F4A300" />
          </svg>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream/70 px-3.5 py-1.5 text-[0.72rem] uppercase tracking-[0.22em] text-ink/80 shadow-sm backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-festival" />
            <span>Since 1968 · 3 generations · 32+ cities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[clamp(3.4rem,8.5vw,7rem)] leading-[0.92] text-ink"
          >
            <span className="block text-festival devanagari">नाज़ ब्रदर्स</span>
            <span className="mt-2 block">
              <span className="text-ink/90">India&rsquo;s most</span>{" "}
              <span className="italic text-mehendi">loved</span>{" "}
              <span className="relative text-ink">
                mela
                <svg
                  className="absolute -bottom-3 left-0 h-3 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8 Q 50 -2 100 6 T 198 5"
                    stroke="#F4A300"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink/75 md:text-[1.18rem]"
          >
            Giant wheels that touch the sky, jhoolas that make your stomach drop,
            and the smell of jalebi on every corner. We&rsquo;ve been bringing the{" "}
            <span className="font-medium text-festival">rounaq</span> to Indian cities
            for over fifty-five years — one mela at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-festival px-7 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-cream shadow-poster transition hover:bg-festival/90"
            >
              <Link href="/book">
                Book a Ride
                <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-ink/20 bg-cream/60 px-7 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-ink hover:bg-marigold/15 hover:border-ink/30"
            >
              <Link
                href={waLink(
                  "Hi NAAZ BROTHERS! We'd love to invite your mela to our city. Can we discuss?",
                )}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-1 h-4 w-4 text-mehendi" />
                Invite Us to Your City
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-ink/10 pt-6"
          >
            {[
              { k: "55+", v: "Years of rounaq" },
              { k: "8", v: "Iconic jhoolas" },
              { k: "1M+", v: "Happy faces yearly" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-festival md:text-4xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-ink/55">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-[3/4] w-full max-w-md lg:block"
        >
          <div className="absolute inset-0 -rotate-2 rounded-[28px] bg-festival/90 shadow-[var(--shadow-xl)]" />
          <div className="absolute inset-0 rotate-1 overflow-hidden rounded-[28px] bg-ink shadow-[var(--shadow-xl)]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 25%, rgba(244,163,0,0.55), transparent 35%),
                  radial-gradient(circle at 75% 70%, rgba(214,40,40,0.55), transparent 40%),
                  radial-gradient(circle at 50% 50%, rgba(56,102,65,0.25), transparent 60%)
                `,
              }}
            />
            <div className="paper-grain absolute inset-0" />

            <div className="relative flex h-full flex-col items-center justify-between p-7 text-cream">
              <div className="flex w-full items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] opacity-90">
                <span>est. 1968</span>
                <span>Lucknow → Bharat</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="font-display text-[2.6rem] leading-none text-marigold">
                  महा मेला
                </div>
                <div className="mt-2 font-display text-xs uppercase tracking-[0.45em] text-cream/80">
                  Grand Tour
                </div>
                <div className="mt-7 h-px w-24 bg-cream/40" />
                <div className="mt-7 font-display text-[1.05rem] leading-tight text-cream/95">
                  Giant Wheel · Columbus
                  <br />
                  Break Dance · Toy Train
                </div>
              </div>

              <div className="flex w-full items-end justify-between">
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.3em] text-cream/70">
                    Ticket
                  </div>
                  <div className="font-display text-2xl text-marigold">₹ 50</div>
                </div>
                <div className="text-right">
                  <div className="text-[0.6rem] uppercase tracking-[0.3em] text-cream/70">
                    Showtime
                  </div>
                  <div className="font-display text-lg leading-none">
                    शाम 5 बजे
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-4 rotate-[8deg] rounded-md bg-marigold px-3 py-1.5 font-display text-sm text-ink shadow-md">
            हाउसफुल!
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <MarigoldGarland />
      </div>
    </section>
  );
}
