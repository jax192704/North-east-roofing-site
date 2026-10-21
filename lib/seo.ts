import type { Metadata } from "next";
import { site } from "./roofing-data";

/** Every indexable route declares its own URL; never inherit the home canonical. */
export function pageMetadata(title: string, description: string, path: string, type: "website" | "article" = "website"): Metadata {
  const url = new URL(path, site.url).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type, locale: "en_GB", siteName: site.name },
  };
}
