"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const u = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

type Story = {
  slug: string;
  title: string;
  meta: string;
  image: string;
};

const stories: Story[] = [
  {
    slug: "free-medical-health-checkup-camp-at-naaz-amusement-jaipur",
    title: "Free Medical Health Checkup Camp at Naaz Amusement Jaipur",
    meta: "Naaz Amusement Jaipur | Apr 25, 2026",
    image: u("1533174072545-7a4b6ad7a6c3"),
  },
  {
    slug: "pickleball-meadows-tournament-at-naaz-amusement-jaipur",
    title: "Pickleball Meadows Tournament at Naaz Amusement Jaipur",
    meta: "Naaz Amusement Jaipur | Apr 25, 2026",
    image: u("1517423568366-8b83523034fd"),
  },
  {
    slug: "naaz-amusement---best-place-to-celebrate-1st-birthday-in-jaipur",
    title: "Naaz Amusement - Best Place to Celebrate 1st Birthday in Jaipur",
    meta: "Naaz Amusement Jaipur | Apr 22, 2026",
    image: u("1559131397-f94da358f7ca"),
  },
  {
    slug: "top-10-rides-you-must-try-at-naaz-amusement",
    title: "Top 10 Rides You Must Try at Naaz Amusement This Summer",
    meta: "Naaz Amusement Jaipur | Apr 18, 2026",
    image: u("1551817958-d9d86fb29431"),
  },
];

export function Chronicles() {
  return (
    <section
      id="chronicles"
      className="relative isolate overflow-hidden bg-deep-purple py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-[clamp(0.85rem,1.2vw,1.1rem)] uppercase tracking-wide text-accent-yellow"
        >
          Naaz Amusement Chronicles
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-3xl font-display text-[clamp(1.6rem,3.5vw,2.375rem)] leading-[1.37] tracking-[0.76px] text-white"
        >
          Stories, tips, and behind-the-scenes chaos from the kingdom.
        </motion.h2>

        {/* 2×2 Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
          {stories.map((story, i) => (
            <motion.article
              key={story.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <Link href={`/blog/${story.slug}`} className="block">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/80 via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <p className="font-display text-[0.75rem] uppercase tracking-wide text-white/50">
                    {story.meta}
                  </p>
                  <h3 className="mt-2 font-display text-[1.25rem] leading-[1.4] tracking-[-0.2px] text-white line-clamp-2">
                    {story.title}
                  </h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Blog button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full bg-white px-8 py-3 font-mono-ibm text-[14px] font-medium text-black transition hover:bg-accent-yellow hover:text-deep-purple"
          >
            View All Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
