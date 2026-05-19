"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "ATTRACTIONS", href: "/attractions" },
  { label: "KHAO GALI", href: "/khao-gali" },
  { label: "TICKET INFO", href: "/ticket-info" },
  { label: "CONTACT US", href: "/contact" },
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

  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-deep-purple/90 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          {/* Book Tickets — left */}
          <Link
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="font-display text-[14px] tracking-[-0.14px] text-fk-offwhite underline underline-offset-4 transition hover:text-accent-yellow"
          >
            BOOK TICKETS
          </Link>

          {/* Logo center (visible on scroll) */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <motion.div
              initial={false}
              animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto"
            >
              <span className="font-display text-[1.3rem] tracking-wide text-white">
                Fun<span className="text-accent-yellow">Kingdom</span>
              </span>
            </motion.div>
          </Link>

          {/* Menu — right */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 font-display text-[24px] leading-[28px] tracking-normal text-[#EDEDED] transition hover:text-white"
          >
            <span className="hidden sm:inline">MENU</span>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white"
          >
            {/* Close bar */}
            <div className="flex items-center justify-end px-6 py-5 md:px-10">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 font-display text-[24px] text-[#131313] transition hover:text-accent-magenta"
              >
                <span className="hidden sm:inline">CLOSE</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col items-start justify-center gap-4 px-10 md:px-20">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-[clamp(3rem,8vw,6rem)] leading-tight text-[#131313] transition-colors hover:text-accent-magenta"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Book tickets CTA */}
            <div className="px-10 pb-10 md:px-20">
              <Link
                href={site.bookingUrl}
                target="_blank"
                className="inline-flex items-center gap-3 rounded-full bg-deep-purple px-8 py-4 font-display text-[14px] uppercase tracking-wide text-white transition hover:bg-accent-magenta"
              >
                BOOK YOUR TICKETS
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
