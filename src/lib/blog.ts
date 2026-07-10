export type BlogParagraph = {
  type: "paragraph";
  text: string;
};

export type BlogSubheading = {
  type: "subheading";
  text: string;
};

export type BlogQuote = {
  type: "quote";
  text: string;
  author?: string;
};

export type BlogBlock = BlogParagraph | BlogSubheading | BlogQuote;

export type BlogPost = {
  slug: string;
  title: string;
  meta: string;
  image: string;
  excerpt: string;
  readTime: string;
  category: string;
  blocks: BlogBlock[];
};

const u = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const blogPosts: BlogPost[] = [
  {
    slug: "free-medical-health-checkup-camp-at-naaz-amusement-jaipur",
    title: "Free Medical Health Checkup Camp at Naaz Amusement Jaipur",
    meta: "Naaz Amusement Jaipur · Apr 25, 2026",
    excerpt: "In partnership with leading healthcare providers, Naaz Amusement organized a comprehensive free health camp serving over 450 villagers and local staff.",
    image: u("1533174072545-7a4b6ad7a6c3"),
    readTime: "3 min read",
    category: "Community",
    blocks: [
      {
        type: "paragraph",
        text: "At Naaz Amusement, we believe that community service is the cornerstone of any successful enterprise. In our continuous effort to give back to the society, we organized a one-day Free Medical Health Checkup Camp at our park premises on Ajmer Road, Jaipur, on April 25, 2026."
      },
      {
        type: "subheading",
        text: "Serving Over 450 Lives in Bagru & Nearby Areas"
      },
      {
        type: "paragraph",
        text: "The medical camp was designed to address the healthcare needs of local villagers, neighboring communities, and our dedicated park staff. In partnership with renowned doctors and specialists from top-tier hospitals in Jaipur, we provided consultations across general medicine, orthopedics, cardiology, and pediatrics."
      },
      {
        type: "quote",
        text: "Providing accessible healthcare options to our local community is not just a corporate social responsibility; it is our moral duty as neighbors.",
        author: "Director of Community Relations, Naaz Amusement"
      },
      {
        type: "subheading",
        text: "Free Diagnostics and Medicines Distributed"
      },
      {
        type: "paragraph",
        text: "Beyond basic consultations, the camp offered free diagnostic tests, including blood sugar profiling, blood pressure monitoring, ECGs, and bone density scans. Additionally, essential medicines prescribed by the practitioners were distributed free of charge. We are immensely grateful to the volunteering medical teams who worked tirelessly throughout the day to ensure that every visitor received top-tier medical attention."
      }
    ]
  },
  {
    slug: "naaz-amusement---best-place-to-celebrate-1st-birthday-in-jaipur",
    title: "Naaz Amusement - Best Place to Celebrate 1st Birthday in Jaipur",
    meta: "Naaz Amusement Jaipur · Apr 22, 2026",
    excerpt: "Discover why our custom party packages, whimsical décors, and family-appropriate rides make us Jaipur's favorite birthday venue.",
    image: u("1559131397-f94da358f7ca"),
    readTime: "5 min read",
    category: "Celebrations",
    blocks: [
      {
        type: "paragraph",
        text: "Your child's first birthday is a milestone that deserves an extraordinary celebration. While there are countless banquet halls and restaurants in Jaipur, none offer the magical, action-packed atmosphere of Naaz Amusement. Here is why hosting your little one's big day with us is an unforgettable experience."
      },
      {
        type: "subheading",
        text: "Whimsical Custom Décors & Open-Air Lawns"
      },
      {
        type: "paragraph",
        text: "We offer private, beautifully manicured green lawns that can be customized with colorful theme décors, from fairy-tale castles to jungle safaris. Our in-house designers handle everything from customized stage setups to photo booths, ensuring your family photos look absolutely stunning."
      },
      {
        type: "quote",
        text: "We hosted our son's first birthday at Naaz, and our guests are still talking about it. The blend of rides, food, and decoration was perfect!",
        author: "Aakash & Neha, Jaipur Parents"
      },
      {
        type: "subheading",
        text: "Entertainment for All Age Groups"
      },
      {
        type: "paragraph",
        text: "The main drawback of traditional venues is keeping guests entertained. At Naaz Amusement, your adult guests can enjoy high-thrill rides, teenagers can tackle the obstacle courses, and kids can safely enjoy our bumper cars and mini train rides. Couple that with a customized catering menu from our expert halwais, and you have a recipe for the perfect party."
      }
    ]
  },
  {
    slug: "top-10-rides-you-must-try-at-naaz-amusement",
    title: "Top 10 Rides You Must Try at Naaz Amusement This Summer",
    meta: "Naaz Amusement Jaipur · Apr 18, 2026",
    excerpt: "Gear up for summer with our definitive countdown of the most thrilling, splashing, and exciting rides you cannot miss on your next visit.",
    image: u("1551817958-d9d86fb29431"),
    readTime: "5 min read",
    category: "Rides Guide",
    blocks: [
      {
        type: "paragraph",
        text: "With over 80 mechanical joyrides spread across 18 acres of pure fun, planning your day at Naaz Amusement can be overwhelming. To help you maximize your adrenaline intake, we have compiled the definitive checklist of the top rides you absolutely must try on your next visit."
      },
      {
        type: "subheading",
        text: "1. The Mighty 'Striker'"
      },
      {
        type: "paragraph",
        text: "Standing tall as our signature thrill attraction, Striker is not for the faint-hearted. It lifts riders high into the Jaipur sky before spinning and swinging them in a giant 360-degree arc. The view from the top is spectacular, if you can keep your eyes open!"
      },
      {
        type: "subheading",
        text: "2. The Splashing 'Wave Pool'"
      },
      {
        type: "paragraph",
        text: "The perfect antidote to Rajasthan's blazing summer heat. Our massive wave pool produces realistic ocean-like waves, ranging from gentle swells to larger crests, making it a favorite for families and thrill-seekers alike."
      },
      {
        type: "quote",
        text: "Striker gave me the biggest adrenaline rush of my life. It is a world-class ride right here in Jaipur!",
        author: "Rohan Verma, Adventure Enthusiast"
      },
      {
        type: "subheading",
        text: "3. 'Sky Scrambler' & Multi-Axis Madness"
      },
      {
        type: "paragraph",
        text: "Another extreme favorite, the Sky Scrambler spins you on three different axes simultaneously. It feels like flying and scrambles your senses in the best way possible. Make sure to check out the full list of our rides in our Attractions page!"
      }
    ]
  }
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
