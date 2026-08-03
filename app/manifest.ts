import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "APEX WEB Studio",
    short_name: "APEX",
    description:
      "Premium web design, web development, e-commerce and custom web applications from Sri Lanka for clients worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#06040d",
    theme_color: "#06040d",
    orientation: "portrait-primary",
    categories: ["business", "design", "productivity"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
