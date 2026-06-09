import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yogayurbliss.com";
  const pages = ["", "/about", "/services", "/programs", "/blog", "/contact", "/privacy-policy", "/terms"];
  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1 : page === "/services" || page === "/programs" ? 0.9 : 0.8,
  }));
}
