export const site = {
  name: "FunKingdom",
  tagline: "Rajasthan's Premier Themed Entertainment Destination",
  description:
    "A world-class amusement park designed by renowned architects, spread across 18 acres of adrenaline, laughter, and wonder.",
  acres: 18,
  ridesCount: "80+",
  googleReviews: "6K+",
  bookingUrl: "https://booking.funkingdomjaipur.com/",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "+91XXXXXXXXXX",
  instagram: "funkingdomjaipur",
  facebook: "funkingdomjaipur",
  youtube: "funkingdomjaipur",
  fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "",
  address:
    "Ajmer Road, Near Bagru Toll, Jaipur, Rajasthan 302028",
  email: "info@funkingdomjaipur.com",
  phone: "+91-1234567890",
} as const;

export const waLink = (text: string) => {
  const phone = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
