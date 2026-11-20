"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Settings, Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { isAdminEmail } from "@/lib/admin";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PACKAGES", href: "/#packages" },
  { label: "RIDES", href: "/attractions" },

  { label: "FAQ", href: "/#faq" },
  { label: "CONTACT", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const [hasHydrated, setHasHydrated] = useState(false);
  const pathname = usePathname();

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
          ? "bg-[#0A0514]/60 backdrop-blur-2xl py-3 border-b border-white/10 shadow-2xl"
          : "bg-transparent py-5"
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
                className="font-display text-[14px] tracking-wide text-fk-offwhite hover:text-accent-yellow transition uppercase whitespace-nowrap"
              >
                {loggedIn ? `HI, ${user.name.split(" ")[0]}` : "SIGN IN"}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-fk-offwhite hover:text-accent-yellow transition p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
            return (
              <div key={link.href} className="relative group py-2">
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "/" && window.location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "relative font-display text-[14px] xl:text-[16px] tracking-widest uppercase transition-all duration-300",
                    isActive
                      ? "text-accent-yellow drop-shadow-[0_0_8px_rgba(238,167,39,0.5)]"
                      : "text-white/80 hover:text-accent-yellow hover:drop-shadow-[0_0_8px_rgba(238,167,39,0.8)]"
                  )}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-yellow shadow-[0_0_10px_rgba(238,167,39,0.8)]"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            );
          })}
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
              className="font-display text-[15px] xl:text-[17px] tracking-wide text-fk-offwhite hover:text-accent-yellow transition uppercase whitespace-nowrap"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full w-full overflow-hidden bg-white shadow-2xl lg:hidden border-t border-gray-100"
          >
            <div className="flex flex-col items-center gap-6 py-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.href === "/" && window.location.pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={cn(
                      "font-display text-[18px] tracking-widest uppercase transition-all duration-300",
                      isActive
                        ? "text-accent-yellow drop-shadow-[0_0_8px_rgba(238,167,39,0.4)]"
                        : "text-deep-purple hover:text-accent-yellow hover:drop-shadow-[0_0_8px_rgba(238,167,39,0.4)]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
