export const site = {
  name: "NAAZ BROTHERS",
  nameHindi: "नाज़ ब्रदर्स",
  tagline: "India's Most Loved Mela",
  taglineHindi: "रौनक़ का सफ़र, तीन पीढ़ियों से",
  established: 1968,
  generations: 3,
  citiesPerYear: 32,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "+91XXXXXXXXXX",
  instagram: "naazbrothers",
  facebook: "naazbrothers",
  fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "",
  address: "Naaz Brothers Mela Co., Old Lucknow Road, Uttar Pradesh, India",
  email: "hello@naazbrothers.in",
} as const;

export const waLink = (text: string) => {
  const phone = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
