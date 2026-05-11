"use client";

import { motion } from "motion/react";

const generations = [
  {
    year: "1968",
    name: "Mohd. Naaz Ali",
    title: "The founder",
    titleHi: "संस्थापक",
    note:
      "Started with a single hand-cranked merry-go-round and three ponies in a Lucknow gali.",
  },
  {
    year: "1992",
    name: "Iqbal & Ishtiaq Naaz",
    title: "The sons",
    titleHi: "दूसरी पीढ़ी",
    note:
      "Took the mela on the road. First giant wheel raised in Kanpur, then thirty cities in a decade.",
  },
  {
    year: "2018",
    name: "Aman & Faiz Naaz",
    title: "The grandsons",
    titleHi: "तीसरी पीढ़ी",
    note:
      "Modern safety, new rides, weddings & corporate events. Same chai. Same crowd. Same rounaq.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-paper py-24 md:py-32"
      style={{ ["--paper" as never]: "#FFF3D9" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(214,40,40,0.08),transparent_60%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <p className="font-display text-[0.78rem] uppercase tracking-[0.32em] text-festival">
            Our story · हमारी कहानी
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,4.6vw,3.8rem)] leading-[1.02] text-ink">
            One family.{" "}
            <span className="italic text-mehendi">Three&nbsp;generations.</span>{" "}
            One travelling mela.
          </h2>
          <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-ink/75">
            Naaz Brothers began in 1968 when our dadaji painted ponies for the
            Lucknow Mahotsav. We&rsquo;ve never stopped travelling since — every
            November to March, our jhoolas land in a new city, light up the
            ground, and bring the whole town out after sundown.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Stat k="55+" v="Years on the road" />
            <Stat k="32" v="Cities a year" />
            <Stat k="120+" v="Crew &amp; family" />
          </div>
        </div>

        <ol className="relative space-y-10 border-l-2 border-dashed border-ink/15 pl-8">
          {generations.map((g, i) => (
            <motion.li
              key={g.year}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-[2.45rem] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-festival text-cream ring-4 ring-paper">
                <span className="h-2 w-2 rounded-full bg-marigold" />
              </span>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-3xl text-festival">{g.year}</span>
                <span className="font-display text-base text-ink">
                  {g.name}
                </span>
                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-mehendi">
                  {g.title} · <span className="devanagari">{g.titleHi}</span>
                </span>
              </div>
              <p className="mt-2 max-w-prose text-[0.98rem] leading-relaxed text-ink/75">
                {g.note}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-festival">{k}</div>
      <div
        className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-ink/55"
        dangerouslySetInnerHTML={{ __html: v }}
      />
    </div>
  );
}
