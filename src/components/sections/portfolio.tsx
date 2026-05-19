"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type Experience = {
  num: string;
  title: string;
  tagline: string;
  image: string;
};

const experiences: Experience[] = [
  {
    num: "01",
    title: "Amusement Park",
    tagline: "Where Gravity is Just a Suggestion",
    image: "/p1.jpg",
  },
  {
    num: "02",
    title: "Adventure Park",
    tagline: "Your Comfort Zone Called. You Didn't Answer",
    image: "/2.jpg",
  },
  {
    num: "03",
    title: "Khao Gali",
    tagline:
      "25+ obstacle courses suspended mid-air. Rope bridges, cargo nets, and sky cycling — where your courage gets tested.",
    image: "/3.jpg",
  },
  {
    num: "04",
    title: "Sports Arena",
    tagline:
      "Beat the Jaipur heat with wave pools, water slides, and lazy rivers. A tropical escape without the airfare.",
    image: "/4.jpeg",
  },
  {
    num: "05",
    title: "Pickleball Meadows",
    tagline:
      "Professional-grade facilities for tournaments, corporates, and weekend warriors. Play where champions train.",
    image: "/5.jpg",
  },
  {
    num: "06",
    title: "Corporate Activities",
    tagline:
      "Team building experiences that actually build teams. Adventure courses, challenges, and collaborative fun.",
    image: "/6.jpg",
  },
  {
    num: "07",
    title: "Birthdays & Parties",
    tagline:
      "Private party setups with themed décor, unlimited rides, and memories your child will talk about forever.",
    image: "/p1.jpg",
  },
  {
    num: "08",
    title: "Events & Concerts",
    tagline:
      "With 50+ themed backdrops, FunKingdom is Jaipur's most Instagrammable event destination.",
    image: "/2.jpg",
  },
];

const TOTAL = experiences.length;

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActive = useCallback((i: number) => {
    setActiveIndex((prev) => (prev === i ? prev : i));
  }, []);

  return (
    <section
      id="portfolio"
      className="relative isolate bg-dark-teal text-white"
    >
      {/* INTRO */}
      <div className="mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-center px-5 py-24 md:px-8 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-[clamp(0.85rem,1.2vw,1.1rem)] uppercase tracking-wide text-accent-yellow"
        >
          Signature Experiences
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-5xl font-display text-[clamp(2.2rem,5vw,3rem)] leading-[1.17] tracking-[0.96px] text-white"
        >
          Our portfolio of thrills showcases the diversity of our madness.
        </motion.h2>
      </div>

      {/* PINNED LEFT + SCROLLING RIGHT */}
      <div className="relative mx-auto grid max-w-[100rem] grid-cols-1 px-0 lg:grid-cols-2 lg:gap-0 lg:px-8">
        {/* LEFT — sticky big image with counter */}
        <div className="sticky top-0 hidden h-screen items-center justify-center lg:flex">
          <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden rounded-r-[2rem] bg-dark-teal">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.num}
                initial={false}
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  scale: i === activeIndex ? 1 : 1.04,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                aria-hidden={i !== activeIndex}
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>
            ))}

            {/* Scrim */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

            {/* Counter — bottom left */}
            <div className="pointer-events-none absolute bottom-10 left-10 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={experiences[activeIndex].num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="font-display leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                >
                  <span className="text-[clamp(3.5rem,6.5vw,4.5rem)]">
                    {experiences[activeIndex].num}
                  </span>
                  <span className="text-[clamp(2rem,4vw,3rem)] text-white/40">
                    /{String(TOTAL).padStart(2, "0")}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT — scrolling cards */}
        <div className="flex flex-col gap-8 px-5 py-12 sm:gap-12 sm:px-8 sm:py-16 lg:gap-24 lg:px-12 lg:py-32">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.num}
              experience={exp}
              index={i}
              isActive={i === activeIndex}
              onActive={handleActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
  isActive,
  onActive,
}: {
  experience: Experience;
  index: number;
  isActive: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) onActive(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onActive]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-none shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 95vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />

        {/* Mobile counter */}
        <div className="absolute left-5 top-5 z-10 lg:hidden">
          <span className="font-display text-[2.2rem] leading-none text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
            {experience.num}
            <span className="text-white/40">/{String(TOTAL).padStart(2, "0")}</span>
          </span>
        </div>

        {/* Bottom scrim + label */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

        <div className="absolute inset-x-6 bottom-6 z-10 text-white sm:inset-x-8 sm:bottom-8">
          <h3 className="font-display text-[clamp(1.8rem,4vw,3.125rem)] leading-[1.1] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)]">
            {experience.title}
          </h3>
          <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-white/80">
            {experience.tagline}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
