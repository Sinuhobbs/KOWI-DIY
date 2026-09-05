import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kowi",
    short_name: "Kowi",
    description: "Kowi DIY — shop home and hardware, delivered locally.",
    start_url: "/home",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#d8f59a",
    theme_color: "#d8f59a",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
