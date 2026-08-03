export type PortfolioCategory =
  | "Web Design"
  | "E-commerce"
  | "Web Applications"
  | "SEO & Performance";

export type PortfolioVisual =
  | "property"
  | "commerce"
  | "dashboard"
  | "hospitality"
  | "corporate"
  | "technology"
  | "services"
  | "astrology";

export type PortfolioProject = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: PortfolioCategory;
  services: string[];
  summary: string;
  result: string;
  visual: PortfolioVisual;
  accent: string;
  image?: string;
  liveUrl?: string;
  featured?: boolean;
};

export const portfolioCategories: Array<"All" | PortfolioCategory> = [
  "All",
  "Web Design",
  "E-commerce",
  "Web Applications",
  "SEO & Performance",
];

/**
 * ADDING A NEW PORTFOLIO PROJECT
 * --------------------------------
 * Copy one object below, change its values and save this file.
 * The new project automatically appears on /portfolio and in its filter.
 *
 * For a real screenshot:
 * 1. Put the image in /public/portfolio/your-image.webp
 * 2. Add: image: "/portfolio/your-image.webp"
 * 3. Recommended size: 1600 × 1100 px, WebP format.
 */
export const portfolioProjects: PortfolioProject[] = [
    {
      slug: "apex-tours-yala",
      title: "Apex Tours — Yala",
      client: "Ready-to-purchase safari tourism website",
      year: "2026",
      category: "Web Design",
      services: [
        "Web Design",
        "Safari Booking UX",
        "Responsive Development",
        "Tourism Website",
      ],
      summary:
        "A premium safari and tour-booking website concept created for wildlife tour operators, travel agencies and private safari guides. The complete project is available for purchase and can be customised with a buyer’s branding, tours, pricing and contact details.",
      result:
        "A ready-to-launch tourism website available for purchase and customisation",
      visual: "hospitality",
      image: "/portfolio/apex-tours-yala.webp",
      liveUrl: "https://apexsafariproject.sanija-web.site",
      accent: "#d9a52e",
      featured: true,
  },
  {
    slug: "kendare-astro",
    title: "Kendare Astro",
    client: "Online astrology consultation service",
    year: "2026",
    category: "Web Design",
    services: [
      "Web Design",
      "Consultation Booking UX",
      "Responsive Development",
      "Contact Form Integration",
      "Whatsapp Integration",
    ],
    summary:
      "A personalised astrology consultation platform designed to help users explore services, discover consultation categories and connect with an expert through a clear and accessible booking journey.",
    result: "Simplified service discovery and consultation enquiries",
    visual: "astrology",
      image: "/portfolio/kendare-astro.webp",
      liveUrl: "https://kendareastro.com",
      accent: "#b70f16",
    featured: true,
  },
  {
      slug: "villa-aurelia",
      title: "Villa Aurelia",
      client: "Ready-to-purchase luxury villa website",
      year: "2026",
      category: "Web Design",
      services: [
        "Luxury Web Design",
        "Hospitality Booking UX",
        "Responsive Development",
        "Villa Showcase Experience",
      ],
      summary:
        "A premium luxury-villa website created to showcase an exclusive coastal residence through cinematic imagery, refined typography, accommodation details and clear reservation actions. The complete project is available for purchase and can be customised with a buyer’s property information, branding, gallery, suites and contact details.",
      result:
        "A ready-to-launch luxury hospitality website available for purchase and customisation",
      visual: "hospitality",
      image: "/portfolio/villa-aurelia.webp",
      liveUrl: "https://sanijasathnindu.github.io/luxury-villa/",
      accent: "#e4bd62",
      featured: true,
    },
  {
    slug: "ff-sg-store",
    title: "FF SG Store",
    client: "Gaming services marketplace",
    year: "2026",
    category: "E-commerce",
    services: [
      "Web Design",
      "Pricing & Package UX",
      "Responsive Development",
      "Whatsapp Integration",
    ],
    summary:
      "A bold gaming-focused storefront created to present Free Fire service packages, profile-like offers and premium gaming products through clear pricing cards and direct ordering actions.",
    result: "Centralised package discovery and faster customer ordering",
    visual: "services",
    image: "/portfolio/ff-sg-store.webp",
    liveUrl: "https://mrravistore.live",
    accent: "#00d9f5",
  },
  {
    slug: "apex-command",
    title: "APEX Command",
    client: "Operations platform concept",
    year: "2026",
    category: "Web Applications",
    services: ["Product design", "Dashboard", "Automation"],
    summary:
      "A real-time control centre that converts fragmented operational data into clear business decisions.",
    result: "62% less manual reporting concept benchmark",
    visual: "dashboard",
    accent: "#ffbd68",
    featured: true,
  },
];
