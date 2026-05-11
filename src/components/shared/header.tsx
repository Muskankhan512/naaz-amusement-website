"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.6c0-.86.24-1.45 1.49-1.45h1.6V4.45A21 21 0 0 0 14.27 4.3C12.05 4.3 10.5 5.66 10.5 8.16V10.5H8v3h2.5V21h3z" />
    </svg>
  );
}

const nav = [
  { label: "Jhoolas", labelHi: "झूले", href: "#rides" },
  { label: "Gallery", labelHi: "तस्वीरें", href: "#gallery" },
  { label: "Tour", labelHi: "शहर", href: "#tour" },
  { label: "About", labelHi: "हमारी कहानी", href: "#about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-[padding,background,box-shadow] duration-300",
        scrolled
          ? "py-2.5 bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgb(26_26_46/0.08)]"
          : "py-4 bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-festival text-cream shadow-md ring-2 ring-marigold">
            <span className="font-display text-lg leading-none">न</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.05rem] tracking-wide text-ink">
              NAAZ <span className="text-festival">BROTHERS</span>
            </span>
            <span className="font-display text-[0.7rem] text-mehendi mt-0.5">
              तीन पीढ़ियों की रौनक़
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex flex-col items-center text-[0.82rem] font-medium text-ink/80 transition-colors hover:text-festival"
            >
              <span>{item.label}</span>
              <span className="font-display text-[0.65rem] text-mehendi/80 -mt-0.5">
                {item.labelHi}
              </span>
              <span className="absolute -bottom-1 h-[2px] w-0 bg-festival transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`https://instagram.com/${site.instagram}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-marigold/15 hover:text-festival sm:flex"
          >
            <InstagramIcon className="h-4 w-4" />
          </Link>
          <Link
            href={`https://facebook.com/${site.facebook}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-marigold/15 hover:text-festival sm:flex"
          >
            <FacebookIcon className="h-4 w-4" />
          </Link>

          <Button
            asChild
            size="sm"
            className="h-10 rounded-full bg-festival px-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream shadow-poster hover:bg-festival/90"
          >
            <Link href="/book">Book a Ride</Link>
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-3 rounded-2xl border border-ink/10 bg-cream/95 p-5 shadow-lg backdrop-blur md:hidden"
        >
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-ink/5 pb-2 text-base text-ink"
              >
                <span>{item.label}</span>
                <span className="font-display text-sm text-mehendi">
                  {item.labelHi}
                </span>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
