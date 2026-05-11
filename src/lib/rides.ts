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

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const rides: Ride[] = [
  {
    slug: "giant-wheel",
    name: "Giant Wheel",
    nameHi: "बड़ा झूला",
    thrill: "Family",
    minAge: 4,
    capacity: 48,
    pricePaise: 5000,
    duration: "8 min",
    tagline: "Touch the sky, one cabin at a time.",
    description:
      "Our signature 60-foot Ferris wheel — the centerpiece of every Naaz mela. Watch the city sparkle as you rise above the lights and the laughter.",
    image: u("1551861568-c0afc78d8d96"),
    tint: "#D62828",
  },
  {
    slug: "columbus",
    name: "Columbus",
    nameHi: "कोलंबस",
    thrill: "Wild",
    minAge: 10,
    capacity: 24,
    pricePaise: 7000,
    duration: "5 min",
    tagline: "Swing till your heart skips a beat.",
    description:
      "A giant pendulum boat that swings higher and higher until you're nearly upside-down. Bring a brave friend.",
    image: u("1525160354320-d8e92641c563"),
    tint: "#F4A300",
  },
  {
    slug: "break-dance",
    name: "Break Dance",
    nameHi: "ब्रेक डांस",
    thrill: "Extreme",
    minAge: 12,
    capacity: 16,
    pricePaise: 8000,
    duration: "4 min",
    tagline: "Disco lights, dizzy laughter.",
    description:
      "Spinning pods inside a spinning platform. The DJ blasts, the lights flash, and the world turns into a blur.",
    image: u("1530908295418-a12e326966ba"),
    tint: "#386641",
  },
  {
    slug: "dragon-train",
    name: "Dragon Train",
    nameHi: "ड्रैगन ट्रेन",
    thrill: "Medium",
    minAge: 6,
    capacity: 20,
    pricePaise: 5000,
    duration: "3 min",
    tagline: "A roaring ride for little adventurers.",
    description:
      "A roller-coaster styled as a fire-breathing dragon. Loops and drops sized just right for first-timers.",
    image: u("1513889961551-628c1e5e2ee9"),
    tint: "#1A1A2E",
  },
  {
    slug: "toy-train",
    name: "Toy Train",
    nameHi: "खिलौना रेल",
    thrill: "Family",
    minAge: 2,
    capacity: 30,
    pricePaise: 3000,
    duration: "6 min",
    tagline: "Choo-choo through the mela.",
    description:
      "A scenic little train that loops the fairground past every food stall, jhoola and lit-up arch. Pure nostalgia.",
    image: u("1572450082916-e1d52ab09c10"),
    tint: "#F4A300",
  },
  {
    slug: "merry-go-round",
    name: "Merry-go-round",
    nameHi: "घोड़ा झूला",
    thrill: "Family",
    minAge: 2,
    capacity: 24,
    pricePaise: 3000,
    duration: "4 min",
    tagline: "Hand-painted horses, hand-me-down joy.",
    description:
      "Our original 1972 carousel with its painted ponies. Three generations of children have grown up on these horses.",
    image: u("1561049501-fc0c6f7d35bd"),
    tint: "#D62828",
  },
  {
    slug: "pirate-ship",
    name: "Pirate Ship",
    nameHi: "जहाज़ी झूला",
    thrill: "Wild",
    minAge: 8,
    capacity: 30,
    pricePaise: 6000,
    duration: "5 min",
    tagline: "Ahoy! Hold tight.",
    description:
      "A swinging galleon that rocks higher and higher. Sit at the ends if you dare — that's where the air goes wild.",
    image: u("1525351484163-7529414344d8"),
    tint: "#386641",
  },
  {
    slug: "bumper-cars",
    name: "Bumper Cars",
    nameHi: "टकर गाड़ी",
    thrill: "Medium",
    minAge: 7,
    capacity: 14,
    pricePaise: 5000,
    duration: "5 min",
    tagline: "Bump, dodge, repeat.",
    description:
      "Tiny electric cars on a polished floor. The only mela ride where crashing into your cousin is encouraged.",
    image: u("1581235720704-06d3acfcb36f"),
    tint: "#1A1A2E",
  },
];

export const formatPrice = (paise: number) => `₹ ${(paise / 100).toFixed(0)}`;

export const rideBySlug = (slug: string) =>
  rides.find((r) => r.slug === slug);
