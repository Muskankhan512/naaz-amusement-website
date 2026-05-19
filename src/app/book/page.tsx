"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Check, ChevronLeft, ChevronRight, Clock, ArrowLeft, MessageCircle, Plus, Minus, Tag, Ticket, Info, Sparkles } from "lucide-react";
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
import { rides } from "@/lib/rides";

const steps = [
  { id: "date", label: "Date" },
  { id: "details", label: "Details" },
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

  const bookingType = "rental";

  // Setup/Jhula Rental state
  const [rentalData, setRentalData] = useState({
    selectedRides: [] as string[],
    rentalDays: 1,
    distanceSlab: "inside" as "inside" | "medium" | "far",
  });

  // Pre-select rides if package query parameter is present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pkg = params.get("package");
      if (pkg) {
        if (pkg === "mela-carnival") {
          setRentalData((prev) => ({
            ...prev,
            selectedRides: ["striker", "sky-scrambler", "wave-pool", "roller-coaster", "bumper-cars"],
          }));
        } else if (pkg === "royal-wedding") {
          setRentalData((prev) => ({
            ...prev,
            selectedRides: ["sky-scrambler", "bumper-cars", "sky-cycling"],
          }));
        } else if (pkg === "corporate-school") {
          setRentalData((prev) => ({
            ...prev,
            selectedRides: ["lazy-river", "bumper-cars", "zip-line"],
          }));
        }
      }
    }
  }, []);

  // Promo code state
  const [promoCode, setPromoCode] = useState("");
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState("");

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

  // Ride rental daily pricing mapping
  const rideRentalPrices: Record<string, number> = {
    "striker": 80000,
    "sky-scrambler": 80000,
    "wave-pool": 50000,
    "roller-coaster": 60000,
    "bumper-cars": 30000,
    "zip-line": 40000,
    "lazy-river": 30000,
    "sky-cycling": 35000,
  };

  // Calculation helper
  const getInvoice = () => {
    let ridesSubtotal = 0;
    rentalData.selectedRides.forEach((slug) => {
      ridesSubtotal += (rideRentalPrices[slug] || 30000) * rentalData.rentalDays;
    });

    let transportCost = 0;
    if (ridesSubtotal > 0) {
      if (rentalData.distanceSlab === "inside") transportCost = 5000;
      else if (rentalData.distanceSlab === "medium") transportCost = 12000;
      else if (rentalData.distanceSlab === "far") transportCost = 25000;
    }

    const subtotal = ridesSubtotal + transportCost;

    // Event category discounts
    let defaultEventDiscount = 0;
    if (formData.eventType === "School Trip") defaultEventDiscount = 25;
    else if (formData.eventType === "Corporate Event") defaultEventDiscount = 15;
    else if (formData.eventType === "Wedding / Pre-Wedding") defaultEventDiscount = 10;
    else if (formData.eventType === "Birthday Party") defaultEventDiscount = 5;
    else if (formData.eventType === "Mela / Carnival") defaultEventDiscount = 10;

    const discountPercent = activeDiscount ? activeDiscount.percent : defaultEventDiscount;
    const discount = Math.round(subtotal * (discountPercent / 100));
    const tax = Math.round((subtotal - discount) * 0.18);
    const total = ridesSubtotal > 0 ? (subtotal - discount + tax) : 0;

    return {
      ridesSubtotal,
      transportCost,
      subtotal,
      discountPercent,
      discount,
      tax,
      total,
    };
  };

  const invoice = getInvoice();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === "NAAZ20") {
      setActiveDiscount({ code: "NAAZ20", percent: 20 });
      setPromoError("");
    } else if (code === "SCHOOL25" && formData.eventType === "School Trip") {
      setActiveDiscount({ code: "SCHOOL25", percent: 25 });
      setPromoError("");
    } else if (code === "CORP15" && formData.eventType === "Corporate Event") {
      setActiveDiscount({ code: "CORP15", percent: 15 });
      setPromoError("");
    } else if (code === "SCHOOL25" || code === "CORP15") {
      setPromoError(`Code ${code} is only valid for corresponding Event Type.`);
      setActiveDiscount(null);
    } else {
      setPromoError("Invalid Promo Code.");
      setActiveDiscount(null);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateStr = selectedDate ? format(selectedDate, "dd MMM yyyy") : "Not selected";

    let msg = `🎢 *NEW BOOKING INQUIRY — Naaz Amusement*\n\n`;
    msg += `*Name:* ${formData.name}\n`;
    msg += `*Phone:* ${formData.phone}\n`;
    msg += `*City/Venue:* ${formData.city}\n`;
    msg += `*Date:* ${dateStr}\n`;
    msg += `*Booking Type:* Event Setup Rental\n`;
    msg += `*Event Type:* ${formData.eventType || "General"}\n`;
    msg += `*Expected Guests:* ${formData.guests || "Not specified"}\n`;
    msg += `*Setup Duration:* ${rentalData.rentalDays} Day(s)\n`;
    msg += `*Setup Location:* ${rentalData.distanceSlab === "inside" ? "Jaipur Limits" : rentalData.distanceSlab === "medium" ? "50-100 km" : "100+ km"}\n\n`;

    msg += `*Selected Rides:*\n`;
    const selectedRidesList = rides.filter(r => rentalData.selectedRides.includes(r.slug));
    selectedRidesList.forEach(r => {
      const rate = rideRentalPrices[r.slug] || 30000;
      msg += `- ${r.name} (${rentalData.rentalDays} days): ₹${rate * rentalData.rentalDays}\n`;
    });
    msg += `\n--- Price Estimate ---\n`;
    msg += `Rides Rental: ₹${invoice.ridesSubtotal}\n`;
    msg += `Setup & Transport: ₹${invoice.transportCost}\n`;
    msg += `Subtotal: ₹${invoice.subtotal}\n`;
    if (invoice.discount > 0) {
      msg += `Discount (${activeDiscount ? activeDiscount.code : 'Event'}): -₹${invoice.discount}\n`;
    }
    msg += `GST (18%): ₹${invoice.tax}\n`;
    msg += `*TOTAL ESTIMATED:* ₹${invoice.total}\n`;
    msg += `----------------------`;

    if (formData.message) {
      msg += `\n\n*Additional Details:* ${formData.message}`;
    }

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
                  (currentStep === "details" && index === 0) ||
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
                    onClick={() => setCurrentStep("details")}
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

            {/* STEP 2: DETAILS FORM & PRICE CALCULATOR */}
            {currentStep === "details" && (
              <motion.div
                key="step-details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12"
              >
                {/* Left: Input configurations & Details */}
                <div className="flex flex-col gap-8">
                  {/* Form fields & Interactive Configs */}
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-10">
                    <h3 className="font-display text-2xl tracking-wide text-white mb-6">
                      1. Event Details
                    </h3>

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
                          <label className={labelClasses}>
                            Event Setup Venue / Location *
                          </label>
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

                      {/* Setup Duration & Transport */}
                      <div className="mt-4 space-y-6 border-t border-white/10 pt-6">
                        <h4 className="font-display text-lg tracking-wide text-white mb-2">
                          2. Setup Duration & Transport
                        </h4>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          {/* Days Counter */}
                          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                            <div>
                              <span className="block font-display text-base tracking-wide text-white">Setup Days</span>
                              <span className="text-xs text-white/50">Setup duration multiplier</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setRentalData({ ...rentalData, rentalDays: Math.max(1, rentalData.rentalDays - 1) })}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-semibold text-lg text-white w-8 text-center">{rentalData.rentalDays}</span>
                              <button
                                type="button"
                                onClick={() => setRentalData({ ...rentalData, rentalDays: rentalData.rentalDays + 1 })}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Distance slabs */}
                          <div className="flex flex-col gap-1.5">
                            <label className={labelClasses}>Distance from Jaipur Toll *</label>
                            <select
                              value={rentalData.distanceSlab}
                              onChange={(e) => setRentalData({ ...rentalData, distanceSlab: e.target.value as "inside" | "medium" | "far" })}
                              className={inputClasses}
                            >
                              <option value="inside" className="bg-[#1A1A1A]">Jaipur City Limits (₹5k Setup/Transport)</option>
                              <option value="medium" className="bg-[#1A1A1A]">Within 50-100 km (₹12k Setup/Transport)</option>
                              <option value="far" className="bg-[#1A1A1A]">Beyond 100 km (₹25k Setup/Transport)</option>
                            </select>
                          </div>
                        </div>

                        {/* Ride check grid */}
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="block font-display text-sm tracking-wide text-white">Select Rides to Setup *</span>
                            <span className="text-xs text-accent-yellow">
                              {rentalData.selectedRides.length} ride(s) selected
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-white/40">Select which amusement rides you want custom-built for your event site.</p>
                          
                          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {rides.map((r) => {
                              const rate = rideRentalPrices[r.slug] || 30000;
                              const isSelected = rentalData.selectedRides.includes(r.slug);
                              return (
                                <button
                                  key={r.slug}
                                  type="button"
                                  onClick={() => {
                                    if (isSelected) {
                                      setRentalData({
                                        ...rentalData,
                                        selectedRides: rentalData.selectedRides.filter((slug) => slug !== r.slug),
                                      });
                                    } else {
                                      setRentalData({
                                        ...rentalData,
                                        selectedRides: [...rentalData.selectedRides, r.slug],
                                      });
                                    }
                                  }}
                                  className={`group flex items-center gap-3.5 rounded-xl border p-3.5 text-left transition-all ${
                                    isSelected
                                      ? "border-accent-yellow bg-accent-yellow/10"
                                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                  }`}
                                >
                                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                                    <img
                                      src={r.image}
                                      alt={r.name}
                                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-display text-sm tracking-wide text-white truncate">
                                      {r.name}
                                    </h5>
                                    <p className="mt-0.5 text-xs text-accent-yellow">
                                      ₹{rate.toLocaleString("en-IN")} / day
                                    </p>
                                  </div>
                                  <div
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] ${
                                      isSelected
                                        ? "border-accent-yellow bg-accent-yellow text-deep-purple"
                                        : "border-white/30"
                                    }`}
                                  >
                                    {isSelected && "✓"}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Additional Message */}
                      <div className="mt-4 border-t border-white/10 pt-6">
                        <label className={labelClasses}>Specific Requirements / Comments</label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="e.g. Custom banner backdrops, safety barricades, generator requirements..."
                          className={`${inputClasses} resize-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={rentalData.selectedRides.length === 0}
                        className="group relative mt-4 flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-accent-yellow font-display text-[1.1rem] tracking-[0.1em] text-deep-purple shadow-[0_0_20px_rgba(238,167,39,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(238,167,39,0.5)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-[0_0_20px_rgba(238,167,39,0.3)]"
                      >
                        <MessageCircle className="h-5 w-5 animate-pulse" />
                        SEND BOOKING TO WHATSAPP
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right: Digital Perforated Ticket Invoice */}
                <div className="flex flex-col gap-6 lg:sticky lg:top-28 self-start">
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-2xl">
                    {/* Perforated ticket circular notches */}
                    <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#0A0514] border-r border-white/10" />
                    <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#0A0514] border-l border-white/10" />

                    <div className="text-center">
                      <p className="font-display text-[0.85rem] uppercase tracking-[0.2em] text-accent-yellow">
                        NAAZ AMUSEMENT
                      </p>
                      <h3 className="mt-1 font-display text-2xl tracking-wide text-white">
                        SETUP INVOICE
                      </h3>
                      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                        <span>Date: {selectedDate ? format(selectedDate, "dd MMM yyyy") : "Not selected"}</span>
                        <span>•</span>
                        <span>Type: Event Rental</span>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4 border-t border-dashed border-white/10 pt-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Rides Setup ({rentalData.selectedRides.length} ride(s))</span>
                        <span className="font-medium text-white">₹{(invoice.ridesSubtotal).toLocaleString("en-IN")}</span>
                      </div>
                      {rentalData.rentalDays > 1 && (
                        <div className="flex justify-between text-xs text-white/40 -mt-2">
                          <span>Setup Duration multiplier</span>
                          <span>x{rentalData.rentalDays} days</span>
                        </div>
                      )}
                      {invoice.transportCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Transport & Setup Fee</span>
                          <span className="font-medium text-white">₹{(invoice.transportCost).toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      <div className="border-t border-white/5 my-2" />

                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Subtotal</span>
                        <span className="font-medium text-white">₹{invoice.subtotal.toLocaleString("en-IN")}</span>
                      </div>

                      {invoice.discount > 0 && (
                        <div className="flex justify-between text-sm text-green-400">
                          <span>Discount ({invoice.discountPercent}%)</span>
                          <span>-₹{invoice.discount.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">GST (18%)</span>
                        <span className="font-medium text-white">₹{invoice.tax.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="border-t border-dashed border-white/10 pt-4 mt-2 flex items-baseline justify-between">
                        <span className="font-display text-sm uppercase tracking-wider text-white/50">Total Est.</span>
                        <span className="font-display text-3xl text-accent-yellow drop-shadow-[0_0_10px_rgba(238,167,39,0.3)]">
                          ₹{invoice.total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Barcode & Perforation Cut simulation */}
                    <div className="mt-8 border-t border-white/5 pt-8 flex flex-col items-center justify-center gap-1 opacity-20 select-none">
                      <div className="font-mono text-xl tracking-[4px]">||| ||| | || ||| | ||</div>
                      <span className="font-mono text-[9px] uppercase tracking-wider">EST-ID: NZ-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                  </div>

                  {/* Promo Input Box */}
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="PROMO CODE"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none focus:border-accent-yellow uppercase"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-white/10 px-4 text-xs font-display tracking-widest text-white transition hover:bg-white/20 active:scale-95"
                      >
                        APPLY
                      </button>
                    </form>
                    {activeDiscount && (
                      <p className="mt-2 text-xs text-green-400 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-green-400 animate-spin" /> Code <strong>{activeDiscount.code}</strong> applied ({activeDiscount.percent}% off)!
                      </p>
                    )}
                    {promoError && (
                      <p className="mt-2 text-xs text-red-400">
                        {promoError}
                      </p>
                    )}
                    <div className="mt-3 flex gap-1.5 items-start text-[10px] leading-relaxed text-white/40">
                      <Info className="h-3.5 w-3.5 shrink-0 text-accent-yellow mt-0.5" />
                      <span>
                        Use <strong>NAAZ20</strong> for a flat 20% online discount, or select corporate/school event and use corresponding promo codes.
                      </span>
                    </div>
                  </div>

                  {/* Date selection navigation indicator */}
                  <button
                    type="button"
                    onClick={() => setCurrentStep("date")}
                    className="text-center text-xs font-medium text-white/40 hover:text-white transition underline"
                  >
                    ← Change Booking Date
                  </button>
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
                  Your inquiry has been formulated with the complete estimated pricing breakdown. Please hit send on WhatsApp to start our conversation!
                </p>
                <button
                  onClick={() => {
                    setCurrentStep("date");
                    setSelectedDate(null);
                    setFormData({ name: "", phone: "", city: "", eventType: "", guests: "", message: "" });
                    setRentalData({ selectedRides: [], rentalDays: 1, distanceSlab: "inside" });
                    setPromoCode("");
                    setActiveDiscount(null);
                    setPromoError("");
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
