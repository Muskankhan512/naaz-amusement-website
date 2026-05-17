import type { Metadata, Viewport } from "next";
import { Yatra_One, Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import "./globals.css";

const yatra = Yatra_One({
  subsets: ["latin", "devanagari"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naazamusement.in"),
  title: {
    default: "NAAZ AMUSEMENT — India's Most Loved Mela",
    template: "%s · NAAZ AMUSEMENT",
  },
  description:
    "Three generations of rounaq. Giant wheels, jhoolas, food stalls and family entertainment, on tour across India. Invite NAAZ AMUSEMENT to your city.",
  keywords: [
    "mela",
    "jhoola",
    "giant wheel",
    "fair",
    "Naaz Amusement",
    "Indian carnival",
    "amusement rides",
  ],
  openGraph: {
    type: "website",
    siteName: "NAAZ AMUSEMENT",
    title: "NAAZ AMUSEMENT — India's Most Loved Mela",
    description:
      "Three generations of rounaq. Giant wheels, jhoolas and family entertainment on tour across India.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NAAZ AMUSEMENT",
    description: "India's most loved travelling mela. Book a ride or invite us to your city.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8EC" },
    { media: "(prefers-color-scheme: dark)", color: "#100F1C" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${yatra.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider delay={150}>
          {children}
          <WhatsAppFloat />
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              style: { fontFamily: "var(--font-body)" },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
