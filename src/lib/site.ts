export const site = {
  name: "Naaz Amusement",
  tagline: "Rajasthan's Premier Themed Entertainment Destination",
  description:
    "A world-class amusement park designed by renowned architects, spread across 18 acres of adrenaline, laughter, and wonder.",
  acres: 18,
  ridesCount: "80+",
  googleReviews: "6K+",
  bookingUrl: "/book",
  whatsapp: "+919026752751",
  instagram: "naazamusementjaipur",
  facebook: "naazamusementjaipur",
  youtube: "naazamusementjaipur",
  fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "",
  address:
    "Ajmer Road, Near Bagru Toll, Jaipur, Rajasthan 302028",
  email: "info@naazamusementjaipur.com",
  phone: "+91-9026752751",
} as const;

export const waLink = (text: string) => {
  const phone = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
