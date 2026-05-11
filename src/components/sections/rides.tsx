"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Users } from "lucide-react";
import { rides, formatPrice, type Thrill } from "@/lib/rides";
import { cn } from "@/lib/utils";

const thrillStyles: Record<Thrill, string> = {
  Family: "bg-mehendi/15 text-mehendi border-mehendi/30",
  Medium: "bg-marigold/20 text-[#8a5a00] border-marigold/40",
  Wild: "bg-festival/15 text-festival border-festival/30",
  Extreme: "bg-ink text-cream border-ink",
};

const thrillDots: Record<Thrill, number> = {
  Family: 1,
  Medium: 2,
  Wild: 3,
  Extreme: 4,
};

export function Rides() {
  return (
    <section id="rides" className="relative isolate overflow-hidden bg-cream py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 0%, rgba(244,163,0,0.18), transparent 40%), radial-gradient(circle at 90% 100%, rgba(214,40,40,0.10), transparent 50%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-[0.78rem] uppercase tracking-[0.32em] text-festival">
              Our jhoolas · हमारे झूले
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1.02] text-ink">
              Eight rides.{" "}
              <span className="italic text-mehendi">A thousand</span> stories from
              the swing.
            </h2>
          </div>
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-ink/70">
            From hand-painted carousel horses to a 60-foot giant wheel — every
            jhoola is checked, polished and re-painted before every mela.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rides.map((r, i) => (
            <motion.article
              key={r.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              whileHover={{ y: -6, rotate: -0.5 }}
              className="group relative flex flex-col overflow-hidden rounded-[22px] bg-card ring-1 ring-ink/10 shadow-md transition-shadow hover:shadow-xl"
            >
              <Link
                href={`/rides/${r.slug}`}
                className="relative block aspect-[4/3.2] overflow-hidden"
              >
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
                <div
                  className="absolute -bottom-px left-0 right-0 h-12"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${r.tint}cc)`,
                    mixBlendMode: "multiply",
                  }}
                />

                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] backdrop-blur",
                      thrillStyles[r.thrill],
                      r.thrill !== "Extreme" && "bg-cream/85",
                    )}
                  >
                    <span className="flex gap-0.5">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <span
                          key={j}
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            j < thrillDots[r.thrill]
                              ? "bg-current"
                              : "bg-current/25",
                          )}
                        />
                      ))}
                    </span>
                    {r.thrill}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 rounded-full bg-cream/95 px-3 py-1 font-display text-sm text-festival shadow-sm">
                  {formatPrice(r.pricePaise)}
                </div>

                <div className="absolute bottom-3 left-3 text-cream">
                  <div className="font-display text-2xl leading-none drop-shadow-md">
                    {r.name}
                  </div>
                  <div className="mt-1 font-display text-[0.95rem] leading-none text-cream/95 drop-shadow-md">
                    {r.nameHi}
                  </div>
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-[0.92rem] leading-snug text-ink/75">
                  {r.tagline}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3 text-[0.72rem] text-ink/65">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-mehendi" />
                    {r.minAge}+ yrs · {r.capacity} pax
                  </span>
                  <span className="uppercase tracking-[0.16em]">{r.duration}</span>
                </div>

                <Link
                  href={`/book?ride=${r.slug}`}
                  className="mt-4 inline-flex items-center justify-between rounded-full bg-ink px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-festival"
                >
                  Book this ride
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
