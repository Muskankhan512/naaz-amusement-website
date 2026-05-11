"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export function CtaStrip() {
  return (
    <section className="relative isolate overflow-hidden bg-festival py-20 text-cream md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(244,163,0,0.9), transparent 35%), radial-gradient(circle at 92% 100%, rgba(26,26,46,0.9), transparent 38%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent 0 24px, rgba(255,248,236,0.08) 24px 26px)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-[0.78rem] uppercase tracking-[0.32em] text-marigold">
            Bring us home · हमें बुलाइए
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-display text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[1]"
          >
            Wedding? Fest? School?{" "}
            <span className="italic text-marigold">Society fair?</span>
            <br />
            We&rsquo;ll bring the whole mela to you.
          </motion.h2>
          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-cream/85">
            Pick a date, pick your jhoolas, tell us the venue. We handle the
            trucks, the cabling, the safety certifications, and the chai for the
            guests. You handle the smiles.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/book"
            className="group inline-flex h-14 items-center justify-between rounded-full bg-cream px-6 text-ink shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4)] transition hover:bg-marigold"
          >
            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.22em]">
              Book a Ride
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-festival text-cream transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link
            href={waLink(
              "Namaste NAAZ BROTHERS! We want to invite your mela to our event. Date and venue details: ",
            )}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-14 items-center justify-between rounded-full border-2 border-cream/30 px-6 text-cream transition hover:border-marigold hover:bg-cream/5"
          >
            <span className="inline-flex items-center gap-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em]">
              <MessageCircle className="h-4 w-4 text-marigold" />
              Chat on WhatsApp
            </span>
            <span aria-hidden className="text-cream/60 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-cream/55">
            Replies within an hour · रोज़ 9am–9pm
          </p>
        </div>
      </div>
    </section>
  );
}
