"use client";

import { motion } from "motion/react";
import { site, waLink } from "@/lib/site";

export function WhatsAppFloat() {
  const href = waLink(
    "Hi! I'd like to know more about Naaz Amusement — ticket booking and attractions."
  );

  return (
    <div className="fixed bottom-5 right-4 z-[55] flex flex-col items-center gap-3 sm:bottom-7 sm:right-7">
      {/* Facebook */}
      <motion.a
        href={`https://facebook.com/${site.facebook}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Follow us on Facebook"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg ring-2 ring-white/70"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </motion.a>

      {/* Instagram */}
      <motion.a
        href={`https://instagram.com/${site.instagram}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Follow us on Instagram"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-lg ring-2 ring-white/70"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with Naaz Amusement on WhatsApp"
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.08, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(37,211,102,0.55)] ring-2 ring-white/70"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] motion-safe:animate-ping opacity-30" />
        <svg viewBox="0 0 32 32" className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" aria-hidden>
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.358 0 2.13-.43 2.13-1.59 0-.143-.27-.286-.36-.330-.515-.244-1.36-.66-1.755-.785zM16.32 6.05a8.85 8.85 0 0 0-8.85 8.85c0 1.534.395 3.025 1.146 4.345l-1.404 5.16 5.297-1.318a8.83 8.83 0 0 0 4.04.967h.004a8.85 8.85 0 0 0 8.85-8.85c0-2.36-.916-4.585-2.59-6.26a8.79 8.79 0 0 0-6.26-2.59zm-.04 16.01h-.005a7.13 7.13 0 0 1-3.628-1l-.262-.16-3.143.825.838-3.07-.17-.27a7.16 7.16 0 0 1-1.09-3.79c0-3.95 3.224-7.165 7.165-7.165 1.915 0 3.715.745 5.07 2.1 1.355 1.355 2.1 3.16 2.1 5.07 0 3.945-3.22 7.165-7.16 7.165z" />
        </svg>
      </motion.a>
    </div>
  );
}
