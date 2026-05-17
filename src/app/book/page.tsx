"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  Users,
  Ticket,
} from "lucide-react";
import { waLink } from "@/lib/site";
import { rides } from "@/lib/rides";
import { useState } from "react";

const eventTypes = [
  "Wedding / Sangeet",
  "School / College Fest",
  "Society / RWA Fair",
  "Corporate Event",
  "Festival / Religious Event",
  "Birthday / Private Party",
  "Government / Public Mela",
  "Other",
];

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    eventType: "",
    date: "",
    guests: "",
    selectedRides: [] as string[],
    message: "",
  });

  const handleRideToggle = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedRides: prev.selectedRides.includes(slug)
        ? prev.selectedRides.filter((s) => s !== slug)
        : [...prev.selectedRides, slug],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rideNames = formData.selectedRides
      .map((s) => rides.find((r) => r.slug === s)?.name)
      .filter(Boolean)
      .join(", ");

    const msg = [
      `🎡 NEW BOOKING INQUIRY`,
      ``,
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      formData.email && `Email: ${formData.email}`,
      `City: ${formData.city}`,
      `Event: ${formData.eventType}`,
      formData.date && `Date: ${formData.date}`,
      formData.guests && `Expected Guests: ${formData.guests}`,
      rideNames && `Rides: ${rideNames}`,
      formData.message && `Message: ${formData.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(waLink(msg), "_blank");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1 pt-28 pb-16 md:pt-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Back button */}
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-ink/60 transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display text-[0.78rem] uppercase tracking-[0.32em] text-festival">
                Book a ride · सवारी बुक करें
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] text-ink">
                Tell us about your{" "}
                <span className="italic text-festival">event</span>
              </h1>
              <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink/70">
                Fill in the details below and we&apos;ll get back to you within
                an hour on WhatsApp with a custom quote.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12 w-full rounded-xl border border-ink/10 bg-cream px-4 text-ink placeholder:text-ink/35 outline-none transition focus:border-festival focus:ring-2 focus:ring-festival/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12 w-full rounded-xl border border-ink/10 bg-cream px-4 text-ink placeholder:text-ink/35 outline-none transition focus:border-festival focus:ring-2 focus:ring-festival/20"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60"
                  >
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-12 w-full rounded-xl border border-ink/10 bg-cream px-4 text-ink placeholder:text-ink/35 outline-none transition focus:border-festival focus:ring-2 focus:ring-festival/20"
                  />
                </div>

                {/* City + Event Type */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60"
                    >
                      City / Venue *
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      placeholder="e.g. Lucknow, Gomti Nagar"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="h-12 w-full rounded-xl border border-ink/10 bg-cream px-4 text-ink placeholder:text-ink/35 outline-none transition focus:border-festival focus:ring-2 focus:ring-festival/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="eventType"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60"
                    >
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      required
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData({ ...formData, eventType: e.target.value })
                      }
                      className="h-12 w-full rounded-xl border border-ink/10 bg-cream px-4 text-ink outline-none transition focus:border-festival focus:ring-2 focus:ring-festival/20"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date + Guests */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="h-12 w-full rounded-xl border border-ink/10 bg-cream px-4 text-ink outline-none transition focus:border-festival focus:ring-2 focus:ring-festival/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guests"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60"
                    >
                      Expected Guests
                    </label>
                    <input
                      id="guests"
                      type="text"
                      placeholder="e.g. 200-500"
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: e.target.value })
                      }
                      className="h-12 w-full rounded-xl border border-ink/10 bg-cream px-4 text-ink placeholder:text-ink/35 outline-none transition focus:border-festival focus:ring-2 focus:ring-festival/20"
                    />
                  </div>
                </div>

                {/* Ride selection */}
                <div>
                  <label className="mb-2.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60">
                    Select Rides (optional)
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {rides.map((r) => (
                      <button
                        type="button"
                        key={r.slug}
                        onClick={() => handleRideToggle(r.slug)}
                        className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center transition ${
                          formData.selectedRides.includes(r.slug)
                            ? "border-festival bg-festival/10 text-festival ring-1 ring-festival/30"
                            : "border-ink/10 bg-cream text-ink/70 hover:border-ink/20 hover:bg-cream"
                        }`}
                      >
                        <Ticket className="h-4 w-4" />
                        <span className="text-[0.72rem] font-semibold leading-tight">
                          {r.name}
                        </span>
                        <span className="font-display text-[0.6rem] text-mehendi">
                          {r.nameHi}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink/60"
                  >
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Any special requirements, setup details, etc."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 text-ink placeholder:text-ink/35 outline-none transition focus:border-festival focus:ring-2 focus:ring-festival/20"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-festival text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-cream shadow-poster transition-all hover:bg-festival/90 active:scale-[0.98] sm:w-auto sm:px-10"
                >
                  <MessageCircle className="h-4 w-4 text-marigold" />
                  Send via WhatsApp
                </button>

                <p className="text-[0.72rem] text-ink/45">
                  Your details will be sent to our WhatsApp. We reply within an
                  hour · रोज़ 9am–9pm
                </p>
              </form>
            </motion.div>

            {/* Right: Info panel */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-6 lg:pt-20"
            >
              {/* Contact cards */}
              <div className="space-y-3">
                <div className="rounded-2xl border border-ink/8 bg-paper p-5">
                  <h3 className="font-display text-lg text-ink">
                    Direct Contact
                  </h3>
                  <div className="mt-4 space-y-3">
                    <a
                      href="tel:+91XXXXXXXXXX"
                      className="flex items-center gap-3 text-[0.92rem] text-ink/70 transition hover:text-festival"
                    >
                      <Phone className="h-4 w-4 text-festival" />
                      +91 XXXXX XXXXX
                    </a>
                    <a
                      href="mailto:hello@naazamusement.in"
                      className="flex items-center gap-3 text-[0.92rem] text-ink/70 transition hover:text-festival"
                    >
                      <Mail className="h-4 w-4 text-festival" />
                      hello@naazamusement.in
                    </a>
                    <p className="flex items-start gap-3 text-[0.92rem] text-ink/70">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-festival" />
                      Old Lucknow Road, Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-ink/8 bg-paper p-5">
                  <h3 className="font-display text-lg text-ink">
                    What to Expect
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-[0.9rem] text-ink/70">
                    <li className="flex items-start gap-2.5">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-mehendi" />
                      Reply within 1 hour with a custom quote
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-mehendi" />
                      Setup for 200 to 10,000+ guests
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-mehendi" />
                      All safety certifications included
                    </li>
                  </ul>
                </div>
              </div>

              {/* Trust badge */}
              <div className="rounded-2xl border border-dashed border-marigold/40 bg-marigold/5 p-5 text-center">
                <p className="font-display text-2xl text-marigold">55+</p>
                <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Years of Trust
                </p>
                <p className="mt-2 text-[0.82rem] text-ink/55">
                  Three generations. 32 cities. 1 million smiles a year.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
