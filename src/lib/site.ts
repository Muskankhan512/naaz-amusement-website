export const site = {
  name: "NAAZ AMUSEMENT",
  nameHindi: "नाज़ अम्यूज़मेंट",
  tagline: "India's Most Loved Mela",
  taglineHindi: "रौनक़ का सफ़र, तीन पीढ़ियों से",
  established: 1968,
  generations: 3,
  citiesPerYear: 32,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "+91XXXXXXXXXX",
  instagram: "naazamusement",
  facebook: "naazamusement",
  fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "",
  address: "Naaz Amusement Mela Co., Old Lucknow Road, Uttar Pradesh, India",
  email: "hello@naazamusement.in",
} as const;

export const waLink = (text: string) => {
  const phone = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
