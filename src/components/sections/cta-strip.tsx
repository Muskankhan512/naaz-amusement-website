"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export function CtaStrip() {
  return (
    <section className="relative isolate overflow-hidden bg-deep-purple py-16 text-white sm:py-20 md:py-28">
      {/* Decorative radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(238,167,39,0.2), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-[clamp(0.85rem,1.2vw,1.1rem)] uppercase tracking-wide text-accent-yellow"
        >
          Ready to Rule?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 sm:mt-6 font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05]"
        >
          Your Kingdom Awaits.
          <br />
          <span className="text-accent-yellow">Claim Your Throne.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 sm:mt-6 max-w-2xl font-body text-[0.95rem] sm:text-lg leading-relaxed text-white/80"
        >
          Book your tickets today and unlock a world of 80+ rides, gourmet food
          courts, adventure zones, and memories that will last forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href={site.bookingUrl}
            className="group inline-flex items-center gap-3 rounded-full bg-accent-yellow px-8 py-4 font-display text-[0.9rem] uppercase tracking-wide text-deep-purple shadow-lg transition hover:bg-white"
          >
            BOOK TICKET NOW
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
