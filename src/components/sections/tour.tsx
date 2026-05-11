"use client";

import { motion } from "motion/react";
import { MapPin, Calendar } from "lucide-react";

const stops = [
  {
    city: "Lucknow",
    cityHi: "लखनऊ",
    venue: "Smriti Upvan, Gomti Nagar",
    dates: "Nov 18 — Dec 2",
    status: "next",
  },
  {
    city: "Kanpur",
    cityHi: "कानपुर",
    venue: "Phool Bagh Ground",
    dates: "Dec 6 — Dec 22",
    status: "scheduled",
  },
  {
    city: "Varanasi",
    cityHi: "वाराणसी",
    venue: "Sigra Maidan",
    dates: "Dec 27 — Jan 11",
    status: "scheduled",
  },
  {
    city: "Jaipur",
    cityHi: "जयपुर",
    venue: "Jawahar Circle, Malviya Nagar",
    dates: "Jan 15 — Feb 1",
    status: "scheduled",
  },
  {
    city: "Indore",
    cityHi: "इंदौर",
    venue: "Lalbagh Palace Ground",
    dates: "Feb 5 — Feb 21",
    status: "scheduled",
  },
  {
    city: "Bhopal",
    cityHi: "भोपाल",
    venue: "Lake View Maidan",
    dates: "Feb 26 — Mar 14",
    status: "tentative",
  },
];

export function Tour() {
  return (
    <section
      id="tour"
      className="relative isolate overflow-hidden bg-ink py-24 text-cream md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(244,163,0,0.18), transparent 38%), radial-gradient(circle at 88% 90%, rgba(214,40,40,0.20), transparent 42%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,248,236,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,236,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-[0.78rem] uppercase tracking-[0.32em] text-marigold">
              The tour · सफ़र
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1.02]">
              Where the <span className="italic text-marigold">rounaq</span>{" "}
              lands next.
            </h2>
          </div>
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-cream/75">
            Six cities, four months, one moving carnival. Catch us when we set
            up shop near you.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stops.map((s, i) => (
            <motion.li
              key={s.city}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-cream/12 bg-cream/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-marigold/40 hover:bg-cream/[0.08]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-[0.7rem] uppercase tracking-[0.24em] text-cream/55">
                  Stop {String(i + 1).padStart(2, "0")}
                </span>
                {s.status === "next" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-marigold px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-festival/70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-festival" />
                    </span>
                    Up next
                  </span>
                )}
                {s.status === "tentative" && (
                  <span className="rounded-full border border-cream/20 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream/60">
                    Tentative
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <h3 className="font-display text-3xl text-cream">{s.city}</h3>
                <span className="font-display text-base text-marigold devanagari">
                  {s.cityHi}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-[0.9rem] text-cream/70">
                <p className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mehendi" />
                  {s.venue}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-mehendi" />
                  {s.dates}
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-marigold/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
