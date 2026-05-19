"use client";

export function Tour() {
  const row1Text = "NAAZ AMUSEMENT • LET'S RIDE • NAAZ AMUSEMENT • LET'S RIDE • ";
  const row2Text = "LET'S PLAY • NAAZ AMUSEMENT • LET'S SCREAM • LET'S PLAY • NAAZ AMUSEMENT • LET'S SCREAM • ";

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      {/* Row 1 — scrolling left, deep purple */}
      <div className="marquee-mask relative w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-[128px] text-deep-purple">
            {row1Text}
          </span>
          <span className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-[128px] text-deep-purple">
            {row1Text}
          </span>
        </div>
      </div>

      {/* Row 2 — scrolling right, magenta */}
      <div className="marquee-mask relative mt-4 w-full overflow-hidden">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          <span className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-[128px] text-accent-magenta">
            {row2Text}
          </span>
          <span className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-[128px] text-accent-magenta">
            {row2Text}
          </span>
        </div>
      </div>
    </section>
  );
}
