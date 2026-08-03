import { absoluteUrl, siteConfig } from "@/lib/site";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      alternateName: siteConfig.shortName,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo-512.png"),
        contentUrl: absoluteUrl("/logo-512.png"),
        width: 512,
        height: 512,
        caption: `${siteConfig.name} logo`,
      },
      image: absoluteUrl("/logo-512.png"),
      description: siteConfig.description,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressCountry: siteConfig.location.countryCode,
      },
      areaServed: [
        { "@type": "Country", name: "Sri Lanka" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      sameAs: [siteConfig.social.facebook],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      description: siteConfig.description,
      inLanguage: "en-LK",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: absoluteUrl("/logo-512.png"),
      email: siteConfig.email,
      description: siteConfig.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressCountry: siteConfig.location.countryCode,
      },
      areaServed: "Worldwide",
      priceRange: "$$",
      serviceType: [
        "Web design",
        "Web development",
        "E-commerce development",
        "Custom web application development",
        "SEO and website performance optimisation",
      ],
      parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/#services`,
      name: "Web development services",
      itemListElement: [
        "Business website design and development",
        "E-commerce website development",
        "Custom web application development",
        "Technical SEO and website performance optimisation",
      ].map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: "Worldwide",
        },
      })),
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
