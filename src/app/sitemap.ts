import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/booking", "/terms", "/safety", "/privacy"].map((path) => ({
    url: new URL(path, SITE.url).href,
  }));
}
