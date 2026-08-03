import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PortfolioGallery from "@/components/PortfolioGallery";
import Footer from "@/components/Footer";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { portfolioProjects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Web Design & Development Portfolio Sri Lanka",
  description:
    "Explore APEX WEB Studio website design, e-commerce and custom web application projects from Sri Lanka for local and international businesses.",
  keywords: [
    "web design portfolio Sri Lanka",
    "web development portfolio Sri Lanka",
    "website design projects Sri Lanka",
    "ecommerce website portfolio",
    "custom web application portfolio",
  ],
  alternates: {
    canonical: "/portfolio",
    languages: {
      "en-LK": "/portfolio",
      en: "/portfolio",
      "x-default": "/portfolio",
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/portfolio"),
    title: "Web Design & Development Portfolio | APEX WEB Studio",
    description:
      "Selected web design, e-commerce and custom application work by APEX WEB Studio in Sri Lanka.",
    siteName: siteConfig.name,
    locale: "en_LK",
  },
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "APEX WEB Studio Portfolio",
  url: absoluteUrl("/portfolio"),
  description:
    "Selected web design, e-commerce and web application projects by APEX WEB Studio.",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: portfolioProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.summary,
      url: absoluteUrl(`/portfolio#${project.slug}`),
    })),
  },
};

export default function PortfolioPage() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Preloader />
      <CustomCursor />
      <Navigation />

      <main className="portfolioPage" id="top">
        <header className="portfolioHero">
          <div className="portfolioHeroGrid" aria-hidden="true" />
          <div className="portfolioHeroOrb" aria-hidden="true" />

          <div className="portfolioHeroTop">
            <span>SELECTED WORK · 2026</span>
            <Link href="/">
              <ArrowDownLeft size={16} />
              Return to studio
            </Link>
          </div>

          <h1 id="portfolio-title">
            SELECTED
            <span> DIGITAL WORK.</span>
          </h1>

          <div className="portfolioHeroBottom">
            <p>
              Websites, e-commerce experiences and digital products designed to
              look distinctive, work intelligently and create measurable value.
            </p>
            <div>
              <strong>{String(portfolioProjects.length).padStart(2, "0")}</strong>
              <span>PROJECTS IN THIS COLLECTION</span>
            </div>
          </div>
        </header>

        <PortfolioGallery />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
