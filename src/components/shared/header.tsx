"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { isAdminEmail } from "@/lib/admin";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PACKAGES", href: "/#packages" },
  { label: "RIDES", href: "/attractions" },
  { label: "REVIEWS", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
  { label: "CONTACT", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuthStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loggedIn = hasHydrated && user;
  const isAdmin = Boolean(loggedIn && isAdminEmail(user?.email));

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-deep-purple/95 backdrop-blur-md py-2 sm:py-3 shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent py-3 sm:py-5"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-10 gap-3 lg:gap-0">
        
        {/* Mobile Top Row (Logo + Right Actions) - Only visible on Mobile */}
        <div className="flex w-full items-center justify-between lg:hidden">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={false}
              animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto"
            >
              <span className="font-display text-[1.1rem] tracking-wide text-white whitespace-nowrap">
                Naaz<span className="text-accent-yellow"> Amusement</span>
              </span>
            </motion.div>
          </Link>

          {/* Right actions (Mobile) */}
          <div className="flex items-center gap-4">
            {hasHydrated && (
              <Link
                href={loggedIn ? "/profile" : "/login"}
                className="font-display text-[13px] tracking-wide text-fk-offwhite hover:text-accent-yellow transition uppercase whitespace-nowrap"
              >
                {loggedIn ? `HI, ${user.name.split(" ")[0]}` : "SIGN IN"}
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Nav Links / Mobile Scrollable Row */}
        <div className="flex w-full lg:w-auto items-center gap-5 lg:gap-4 xl:gap-6 overflow-x-auto whitespace-nowrap pb-1 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.href === "/" && window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="font-display text-[13px] xl:text-[15px] tracking-wide text-fk-offwhite transition hover:text-accent-yellow uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Logo (Center Absolute) */}
        <Link href="/" className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <motion.div
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto"
          >
            <span className="font-display text-[1.3rem] tracking-wide text-white whitespace-nowrap">
              Naaz<span className="text-accent-yellow"> Amusement</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {hasHydrated && (
            <Link
              href={loggedIn ? "/profile" : "/login"}
              className="font-display text-[13px] xl:text-[15px] tracking-wide text-fk-offwhite hover:text-accent-yellow transition uppercase whitespace-nowrap"
            >
              {loggedIn ? `HI, ${user.name.split(" ")[0]}` : "SIGN IN"}
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-accent-yellow/40 bg-white/5 px-3 py-1.5 font-display text-[12px] xl:text-[13px] uppercase tracking-widest text-accent-yellow transition hover:border-accent-yellow hover:bg-accent-yellow hover:text-deep-purple"
            >
              <Settings className="h-3.5 w-3.5" />
              Admin Panel
            </Link>
          )}
        </div>

      </div>
    </motion.header>
  );
}
