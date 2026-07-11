import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Poppins, Geist, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";
import { MobileFab } from "@/components/shared/mobile-fab";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naazamusementjaipur.com"),
  title: {
    default: "Naaz Amusement — North India's Premier Traveling Carnival",
    template: "%s · Naaz Amusement",
  },
  description:
    "Naaz Amusement is a premier traveling carnival and mela setup. Bringing world-class rides, adrenaline, laughter, and wonder to your city.",
  keywords: [
    "Naaz Amusement",
    "traveling carnival",
    "mela",
    "mela setup",
    "event organizer",
    "rides",
    "attractions",
    "carnival rides",
    "family entertainment",
  ],
  openGraph: {
    type: "website",
    siteName: "Naaz Amusement",
    title: "Naaz Amusement — North India's Premier Traveling Carnival",
    description:
      "80+ rides & attractions for your mela and events. Book the best carnival rides today.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naaz Amusement Jaipur",
    description:
      "Rajasthan's premier themed entertainment destination. 80+ rides, 18 acres of pure fun.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#210C6D" },
    { media: "(prefers-color-scheme: dark)", color: "#210C6D" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${poppins.variable} ${geist.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-deep-purple text-white pb-24 sm:pb-0">
        <TooltipProvider delay={150}>
          {children}
          <WhatsAppFloat />
          <MobileFab />
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
