export type Thrill = "Family" | "Medium" | "Wild" | "Extreme";

export type Ride = {
  slug: string;
  name: string;
  nameHi: string;
  thrill: Thrill;
  minAge: number;
  capacity: number;
  pricePaise: number;
  duration: string;
  tagline: string;
  description: string;
  image: string;
  tint: string;
};

export const rides: Ride[] = [
  {
    slug: "tower",
    name: "Tower",
    nameHi: "टावर",
    thrill: "Extreme",
    minAge: 12,
    capacity: 24,
    pricePaise: 80000,
    duration: "4 min",
    tagline: "Where gravity is just a suggestion.",
    description:
      "Naaz Amusement's signature thrill ride — a towering experience that sends you spinning, twisting, and screaming through the night sky.",
    image: "/tower.jpg",
    tint: "#210C6D",
  },
  {
    slug: "sunami",
    name: "Sunami",
    nameHi: "सुनामी",
    thrill: "Extreme",
    minAge: 14,
    capacity: 16,
    pricePaise: 80000,
    duration: "5 min",
    tagline: "Scramble your senses at 100 feet.",
    description:
      "A towering ride that spins you in multiple axes at once. Not for the faint-hearted — but absolutely unforgettable.",
    image: "/sunami.jpg",
    tint: "#EEA727",
  },
  {
    slug: "mini-train",
    name: "Mini Train",
    nameHi: "मिनी ट्रेन",
    thrill: "Family",
    minAge: 4,
    capacity: 200,
    pricePaise: 50000,
    duration: "30 min",
    tagline: "A tropical escape without the airfare.",
    description:
      "Beat the summer heat with our massive wave pool. Gentle waves for families, bigger ones for thrill-seekers.",
    image: "/mini-train.jpg",
    tint: "#172F2E",
  },
  {
    slug: "jumping",
    name: "Jumping",
    nameHi: "जंपिंग",
    thrill: "Wild",
    minAge: 10,
    capacity: 24,
    pricePaise: 60000,
    duration: "4 min",
    tagline: "Loops, drops, and pure adrenaline.",
    description:
      "Naaz Amusement's signature coaster with multiple loops, sudden drops, and speeds that will leave you breathless.",
    image: "/jumping.jpg",
    tint: "#8F0177",
  },
  {
    slug: "chand-tara",
    name: "Chand Tara",
    nameHi: "चाँद तारा",
    thrill: "Family",
    minAge: 6,
    capacity: 20,
    pricePaise: 30000,
    duration: "5 min",
    tagline: "Bump, dodge, repeat.",
    description:
      "Electric bumper cars on a polished floor. The only ride where crashing into your friends is encouraged.",
    image: "/chand-tara.jpg",
    tint: "#210C6D",
  },
  {
    slug: "honey-beer",
    name: "Honey Beer",
    nameHi: "हनी बीयर",
    thrill: "Wild",
    minAge: 8,
    capacity: 4,
    pricePaise: 40000,
    duration: "2 min",
    tagline: "Spin, twirl, and laugh.",
    description:
      "Sit inside our giant teacups and spin as fast or as slow as you want. A classic family favorite that guarantees giggles.",
    image: "/honey-beer.jpg",
    tint: "#EEA727",
  },
  {
    slug: "water-tup",
    name: "Water Tup",
    nameHi: "वाटर टुप",
    thrill: "Family",
    minAge: 2,
    capacity: 100,
    pricePaise: 30000,
    duration: "20 min",
    tagline: "Splash and paddle.",
    description:
      "A colorful, shallow pool where kids can captain their own little paddle boats. Safe, fun, and perfect for cooling off.",
    image: "/water-tup.jpg",
    tint: "#172F2E",
  },
  {
    slug: "chakri",
    name: "Chakri",
    nameHi: "चकरी",
    thrill: "Medium",
    minAge: 8,
    capacity: 8,
    pricePaise: 35000,
    duration: "10 min",
    tagline: "Round and round we go.",
    description:
      "A beautifully lit carousel featuring colorful mini-cars. Perfect for our youngest visitors ready for their first ride.",
    image: "/chakri.jpg",
    tint: "#8F0177",
  },
];

export const formatPrice = (paise: number) => `₹ ${(paise / 100).toFixed(0)}`;

export const rideBySlug = (slug: string) =>
  rides.find((r) => r.slug === slug);
