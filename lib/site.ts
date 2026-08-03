const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "APEX WEB Studio",
  shortName: "APEX",
  legalName: "APEX WEB Studio",
  description:
    "APEX WEB Studio is a web development company in Sri Lanka creating high-performance websites, e-commerce platforms and custom web applications for businesses in Sri Lanka and worldwide.",
  url: (configuredUrl || "https://apexwebstudio.example").replace(/\/$/, ""),
  email: "sanijasathnindu85@gmail.com",
  location: {
    city: "Negombo",
    country: "Sri Lanka",
    countryCode: "LK",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61591549684889",
  },
  keywords: [
    "web development company in Sri Lanka",
    "web design company Sri Lanka",
    "website design Sri Lanka",
    "website developers in Sri Lanka",
    "web development services Sri Lanka",
    "ecommerce website development Sri Lanka",
    "custom web application development Sri Lanka",
    "Next.js development company",
    "responsive web design Sri Lanka",
    "SEO services Sri Lanka",
    "web design Negombo",
    "web developers Negombo",
    "business website development",
    "international web development agency",
    "APEX WEB Studio",
  ],
} as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
