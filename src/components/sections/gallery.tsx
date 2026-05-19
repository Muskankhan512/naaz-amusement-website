"use client";

import Image from "next/image";
import { motion } from "motion/react";

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const galleryImages = [
  // Row 1
  [
    { src: u("1517423568366-8b83523034fd"), alt: "Naaz Amusement ride at night" },
    { src: u("1533174072545-7a4b6ad7a6c3"), alt: "Crowd at amusement park" },
    { src: u("1559131397-f94da358f7ca"), alt: "Carnival arcade at dusk" },
    { src: u("1551817958-d9d86fb29431"), alt: "Swing ride in motion" },
    { src: u("1467810563316-b5476525c0f9"), alt: "Carnival lights" },
    { src: u("1554189097-ffe88e998a2b"), alt: "Children at fair" },
    { src: u("1530541930197-ff16ac917b0e"), alt: "Carousel detail" },
    { src: u("1543872084-c7bd3822856f"), alt: "Park arch lit up" },
  ],
  // Row 2
  [
    { src: u("1543872084-c7bd3822856f"), alt: "Park entrance" },
    { src: u("1554189097-ffe88e998a2b"), alt: "Families enjoying rides" },
    { src: u("1517423568366-8b83523034fd"), alt: "Night time rides" },
    { src: u("1559131397-f94da358f7ca"), alt: "Arcade games" },
    { src: u("1533174072545-7a4b6ad7a6c3"), alt: "Water attractions" },
    { src: u("1551817958-d9d86fb29431"), alt: "Adventure zone" },
    { src: u("1467810563316-b5476525c0f9"), alt: "Food court area" },
    { src: u("1530541930197-ff16ac917b0e"), alt: "Bumper cars" },
  ],
  // Row 3
  [
    { src: u("1530541930197-ff16ac917b0e"), alt: "Dinosaur attraction" },
    { src: u("1467810563316-b5476525c0f9"), alt: "Water plaza" },
    { src: u("1543872084-c7bd3822856f"), alt: "Gate entrance" },
    { src: u("1551817958-d9d86fb29431"), alt: "Roller coaster" },
    { src: u("1517423568366-8b83523034fd"), alt: "Evening atmosphere" },
    { src: u("1533174072545-7a4b6ad7a6c3"), alt: "Sports arena" },
    { src: u("1559131397-f94da358f7ca"), alt: "Pickleball courts" },
    { src: u("1554189097-ffe88e998a2b"), alt: "Event stage" },
  ],
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative isolate overflow-hidden bg-deep-purple py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-[clamp(0.85rem,1.2vw,1.1rem)] uppercase tracking-wide text-accent-yellow"
        >
          Gallery
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.17] tracking-[0.96px] text-white"
        >
          A visual feast from the kingdom.
        </motion.h2>
      </div>

      {/* 3-row scrolling gallery */}
      <div className="mt-10 sm:mt-14 space-y-4 sm:space-y-6">
        {galleryImages.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="marquee-mask relative w-full overflow-hidden"
          >
            <div
              className={`flex gap-3 sm:gap-5 ${
                rowIdx % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse"
              }`}
              style={{ animationDuration: `${40 + rowIdx * 8}s` }}
            >
              {[...row, ...row].map((img, i) => (
                <div
                  key={`${rowIdx}-${i}`}
                  className="relative shrink-0"
                  style={{
                    transform: `rotate(${(i % 2 === 0 ? -2 : 2)}deg)`,
                  }}
                >
                  <div className="relative h-[150px] w-[200px] sm:h-[200px] sm:w-[280px] overflow-hidden rounded-sm border-[4px] sm:border-[6px] border-white bg-white shadow-xl md:h-[240px] md:w-[340px]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
