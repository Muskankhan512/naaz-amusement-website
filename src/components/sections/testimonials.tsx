"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion } from "motion/react";

type Review = {
  name: string;
  city: string;
  cityHi: string;
  text: string;
  textHi?: string;
  rating: number;
  tag: string;
};

const reviews: Review[] = [
  {
    name: "Rashmi Tiwari",
    city: "Lucknow",
    cityHi: "लखनऊ",
    text:
      "My nani brought me here in 1995. Now I bring my daughter. The same painted horses, the same chacha at the ticket counter — somehow they make every year feel exactly like that first one.",
    textHi: "तीस साल पुरानी यादें, हर साल नई हो जाती हैं।",
    rating: 5,
    tag: "Family visitor · 8 years",
  },
  {
    name: "Karan Mehta",
    city: "Jaipur",
    cityHi: "जयपुर",
    text:
      "We hired Naaz Amusement for our school's annual fest. Two giant wheels, three smaller jhoolas, food stalls — the whole campus was a mela for three days. Parents are still talking about it.",
    rating: 5,
    tag: "School event · DPS Jaipur",
  },
  {
    name: "Anjali & Sahil Verma",
    city: "Kanpur",
    cityHi: "कानपुर",
    text:
      "Booked the giant wheel and a custom mela setup for our wedding sangeet. The whole baraat went on the rides. Faiz bhai made the whole night magical — and chaotic, in the best way.",
    rating: 5,
    tag: "Wedding · Dec 2024",
  },
  {
    name: "Pooja Singh",
    city: "Indore",
    cityHi: "इंदौर",
    text:
      "Crew is unbelievably careful with safety. My six-year-old wanted to go on the Dragon Train four times. Each time the operator checked her belt himself. That's the difference.",
    rating: 5,
    tag: "Family visitor · 2nd year",
  },
  {
    name: "Imran Sheikh",
    city: "Bhopal",
    cityHi: "भोपाल",
    text:
      "The food stalls alone are worth the trip. Jalebi straight off the kadhai. Bun-tikki, kulfi, paan — and the gulab jamun stand near the carousel? Unreal. The mela just smells like home.",
    rating: 5,
    tag: "Foodie · regular",
  },
];

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (idx: number) => embla?.scrollTo(idx),
    [embla],
  );

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    setCount(embla.scrollSnapList().length);
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", () => {
      setCount(embla.scrollSnapList().length);
      onSelect();
    });
  }, [embla]);

  return (
    <section className="relative isolate overflow-hidden bg-paper py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-marigold/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-festival/12 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-[0.78rem] uppercase tracking-[0.32em] text-festival">
              The families speak · आपकी ज़ुबानी
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1.02] text-ink">
              <span className="italic text-mehendi">Three</span> generations of
              visitors. Same story, every time.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream text-ink transition hover:border-festival hover:text-festival"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream text-ink transition hover:border-festival hover:text-festival"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={emblaRef} className="mt-12 overflow-hidden">
          <div className="flex gap-5 px-1">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.name + i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="relative flex min-w-0 shrink-0 grow-0 basis-full flex-col rounded-3xl bg-cream p-7 ring-1 ring-ink/10 shadow-md sm:basis-[78%] lg:basis-[42%] xl:basis-[36%]"
              >
                <Quote className="absolute -top-3 left-6 h-8 w-8 rotate-180 text-festival/30" />

                <div className="flex items-center gap-1.5 text-marigold">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>

                <blockquote className="mt-5 text-[1.05rem] leading-relaxed text-ink/85">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                {r.textHi && (
                  <p className="mt-3 font-display text-sm text-mehendi devanagari">
                    {r.textHi}
                  </p>
                )}

                <figcaption className="mt-6 flex items-end justify-between border-t border-ink/8 pt-4">
                  <div>
                    <div className="font-display text-base text-ink">{r.name}</div>
                    <div className="text-[0.78rem] text-ink/55">
                      {r.city}{" "}
                      <span className="text-mehendi devanagari">· {r.cityHi}</span>
                    </div>
                  </div>
                  <div className="text-right text-[0.68rem] uppercase tracking-[0.18em] text-ink/40">
                    {r.tag}
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  selected === i
                    ? "w-8 bg-festival"
                    : "w-1.5 bg-ink/25 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
