"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Check, ChevronLeft, ChevronRight, Clock, ArrowLeft, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  getDay,
  isBefore,
  startOfDay,
} from "date-fns";
import { waLink } from "@/lib/site";

const steps = [
  { id: "date", label: "Date" },
  { id: "tickets", label: "Details" },
  { id: "billing", label: "Confirm" },
];

const eventTypes = [
  "Birthday Party",
  "Corporate Event",
  "School Trip",
  "Wedding / Pre-Wedding",
  "Mela / Carnival",
  "Other",
];

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState("date");
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    eventType: "",
    guests: "",
    message: "",
  });

  const isDateAvailable = (date: Date) => {
    const today = startOfDay(new Date());
    if (isBefore(date, today)) return false;
    const day = getDay(date);
    if (day === 1) return false;
    return true;
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayIndex = getDay(monthStart);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `🎢 *NEW BOOKING INQUIRY — Naaz Amusement*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*City/Venue:* ${formData.city}`,
      `*Event Type:* ${formData.eventType}`,
      selectedDate ? `*Date:* ${format(selectedDate, "dd MMM yyyy")}` : "",
      formData.guests ? `*Expected Guests:* ${formData.guests}` : "",
      formData.message ? `*Additional Details:* ${formData.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(waLink(msg), "_blank");
    // Move to final billing/confirmation step just to show a success message
    setCurrentStep("billing");
  };

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[0.95rem] text-white placeholder-white/30 outline-none transition-all focus:border-accent-yellow focus:bg-white/10 focus:ring-1 focus:ring-accent-yellow/50";
  const labelClasses =
    "mb-2 block font-display text-[0.75rem] uppercase tracking-widest text-white/50";

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0A0514] font-body text-white selection:bg-accent-magenta selection:text-white">
      {/* --- AMBIENT GLOW BACKGROUND (Carnival Lights) --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] left-[-10%] h-[60%] w-[50%] rounded-full bg-purple-600/30 blur-[140px] mix-blend-screen" />
        <div className="absolute top-[30%] right-[-10%] h-[50%] w-[40%] rounded-full bg-blue-600/20 blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] h-[50%] w-[50%] rounded-full bg-fuchsia-600/20 blur-[160px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Header />

      <main className="relative z-10 flex-1 pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-[1100px] px-5">
          {/* Back button */}
          <Link
            href="/"
            className="group relative mb-8 inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            Back to Home
          </Link>

          {/* Progress Bar */}
          <div className="mb-14 flex items-center justify-center">
            <div className="flex items-center">
              {steps.map((step, index) => {
                const isActive =
                  currentStep === step.id ||
                  (currentStep === "tickets" && index === 0) ||
                  (currentStep === "billing" && index <= 2);

                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-500 ${
                          isActive
                            ? "border-accent-yellow bg-accent-yellow/10 text-accent-yellow drop-shadow-[0_0_10px_rgba(238,167,39,0.5)]"
                            : "border-white/10 bg-white/5 text-white/20"
                        }`}
                      >
                        <Check className="h-5 w-5" />
                      </div>
                      <span
                        className={`font-display text-[0.8rem] uppercase tracking-widest ${
                          isActive ? "text-white drop-shadow-md" : "text-white/30"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="mx-3 mb-7 h-[1px] w-16 bg-gradient-to-r from-white/20 to-white/5 sm:mx-6 sm:w-32" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content based on Step */}
          <AnimatePresence mode="wait">
            {/* STEP 1: DATE */}
            {currentStep === "date" && (
              <motion.div
                key="step-date"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12"
              >
                {/* Left: Info Card */}
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-12">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  <h2 className="font-display text-4xl tracking-wide text-white drop-shadow-sm">
                    Plan Your Setup
                  </h2>
                  <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-accent-yellow to-transparent" />
                  <p className="mt-6 text-[1rem] leading-[1.8] text-white/60">
                    Prepare for an unforgettable event with our premium jhula
                    setups! Brace yourself to be blown away by the incredible
                    rides that lie ahead. Bookings cannot be cancelled,
                    transferred to another person, or postponed under any
                    circumstances. Additionally, if you need to reschedule,
                    please contact us 48 hours in advance so we can check our
                    availability. <br />
                    <br />
                    <span className="text-white/80">
                      *Please note: Transportation is not included in the setup
                      price and will be charged separately based on location.
                    </span>
                  </p>
                  <div className="mt-12 flex flex-col items-center">
                    <div className="flex items-center gap-2 font-display text-[0.9rem] uppercase tracking-widest text-accent-magenta drop-shadow-[0_0_8px_rgba(238,50,130,0.5)]">
                      <Clock className="h-5 w-5" />
                      Hours of Operation
                    </div>
                    <div className="mt-6 w-full max-w-sm rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 shadow-inner backdrop-blur-md">
                      <div className="space-y-6 text-[1rem] text-white/90">
                        <div className="flex flex-col items-center justify-center gap-1 border-b border-white/5 pb-6">
                          <span className="font-display text-[1.1rem] tracking-wide text-white/60">
                            Weekdays
                          </span>
                          <span className="font-semibold tracking-wide">
                            09:00 AM - 09:00 PM
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 pt-2">
                          <span className="font-display text-[1.1rem] tracking-wide text-white/60">
                            Weekends & Holidays
                          </span>
                          <span className="font-semibold tracking-wide">
                            08:00 AM - 10:00 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Calendar Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-12">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-3xl tracking-wide text-white drop-shadow-sm">
                      {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <div className="flex gap-3">
                      <button
                        onClick={handlePrevMonth}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 shadow-sm backdrop-blur-md transition hover:bg-white/10 hover:text-white active:scale-95"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 shadow-sm backdrop-blur-md transition hover:bg-white/10 hover:text-white active:scale-95"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="grid grid-cols-7 gap-2 text-center font-display text-[0.85rem] uppercase tracking-widest text-white/50">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <div key={d} className="pb-4">
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: startingDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-12 sm:h-14" />
                      ))}
                      {daysInMonth.map((day) => {
                        const isAvailable = isDateAvailable(day);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        return (
                          <button
                            key={day.toISOString()}
                            disabled={!isAvailable}
                            onClick={() => setSelectedDate(day)}
                            className={`flex h-12 items-center justify-center rounded-xl text-[1rem] font-medium transition-all duration-300 sm:h-14 ${
                              isSelected
                                ? "border border-accent-yellow bg-accent-yellow text-deep-purple shadow-[0_0_20px_rgba(238,167,39,0.5)] scale-105"
                                : isAvailable
                                ? "border border-white/10 bg-[#0d2a1a]/80 text-[#88b04b] hover:border-[#88b04b]/50 hover:bg-[#123e25] hover:text-[#a5d65c]"
                                : "cursor-not-allowed border border-transparent bg-white/[0.02] text-white/20"
                            }`}
                          >
                            {format(day, "d")}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    disabled={!selectedDate}
                    onClick={() => setCurrentStep("tickets")}
                    className="group relative mt-12 flex h-16 w-full items-center justify-center overflow-hidden rounded-full bg-white/10 font-display text-[1.1rem] tracking-[0.2em] text-white transition-all disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/10 hover:bg-white hover:text-deep-purple"
                  >
                    {!selectedDate && (
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    )}
                    CONFIRM DATE
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DETAILS FORM */}
            {currentStep === "tickets" && (
              <motion.div
                key="step-tickets"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12"
              >
                {/* Left: Summary */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl">
                  <h2 className="font-display text-3xl tracking-wide text-white drop-shadow-sm">
                    Your Selection
                  </h2>
                  <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-accent-magenta to-transparent" />
                  
                  <div className="mt-10 space-y-8">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                      <p className="font-display text-[0.8rem] uppercase tracking-widest text-white/50">
                        Selected Date
                      </p>
                      <p className="mt-2 text-xl font-medium text-accent-yellow drop-shadow-sm">
                        {selectedDate ? format(selectedDate, "EEEE, dd MMMM yyyy") : ""}
                      </p>
                    </div>

                    <div>
                      <p className="font-display text-[0.85rem] uppercase tracking-widest text-white/50">
                        What Happens Next?
                      </p>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">
                        Fill out the details on the right. Once submitted, our team will review your requirements and get back to you via WhatsApp immediately with a custom quote and setup confirmation.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep("date")}
                    className="mt-12 text-sm font-medium text-white/50 underline transition hover:text-white"
                  >
                    ← Change Date
                  </button>
                </div>

                {/* Right: Form */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-12">
                  <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className={labelClasses}>Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className={labelClasses}>City / Venue Location *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Vaishali Nagar, Jaipur"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Event Type *</label>
                        <select
                          required
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className={inputClasses}
                        >
                          <option value="" className="bg-[#1A1A1A]">Select an event</option>
                          {eventTypes.map((t) => (
                            <option key={t} value={t} className="bg-[#1A1A1A]">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Expected Guests</label>
                      <input
                        type="text"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        placeholder="e.g. 100-200 people"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Any specific requirements?</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="e.g. Need 2 bouncy castles and a slide..."
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group relative mt-4 flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-accent-yellow font-display text-[1.1rem] tracking-[0.1em] text-deep-purple shadow-[0_0_20px_rgba(238,167,39,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(238,167,39,0.5)]"
                    >
                      <MessageCircle className="h-5 w-5" />
                      SEND TO WHATSAPP
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BILLING / SUCCESS */}
            {currentStep === "billing" && (
              <motion.div
                key="step-billing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.3)]">
                  <Check className="h-12 w-12" />
                </div>
                <h2 className="mt-8 font-display text-4xl tracking-wide text-white">
                  Redirecting to WhatsApp...
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[1rem] leading-relaxed text-white/60">
                  Your inquiry has been formulated. Please hit send on WhatsApp to start our conversation!
                </p>
                <button
                  onClick={() => {
                    setCurrentStep("date");
                    setSelectedDate(null);
                    setFormData({ name: "", phone: "", city: "", eventType: "", guests: "", message: "" });
                  }}
                  className="mt-10 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm tracking-widest transition hover:bg-white/10"
                >
                  START NEW BOOKING
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
