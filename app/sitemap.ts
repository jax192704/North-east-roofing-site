import type { MetadataRoute } from "next";
import { areas, questions, site, topics } from "@/lib/roofing-data";
import { featuredGuideBySlug } from "@/lib/featured-guides";
import { homeownerGuides } from "@/lib/homeowner-guides";

import {projects} from "@/lib/project-store";

export const dynamic="force-dynamic";
// Only preferred, directly accessible URLs belong in this sitemap.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed = ["/", "/projects", "/questions", "/topics", "/guides", "/tools/compare-roofing-quotes", "/areas", "/request-a-quote", "/about", "/editorial-standards", "/contact", "/privacy", "/terms"];
  const completed=await projects();
  return [
    ...completed.map(p=>({url:`${site.url}/projects/${p.slug}`,lastModified:p.approvedAt})),
    ...fixed.map(path => ({ url: new URL(path, site.url).href })),
    ...topics.map(topic => ({ url: `${site.url}/topics/${topic.slug}` })),
    ...questions.map(question => ({ url: `${site.url}/questions/${question.slug}`, ...(featuredGuideBySlug(question.slug)?.updatedISO ? {lastModified: featuredGuideBySlug(question.slug)!.updatedISO} : {}) })),
    ...areas.map(area => ({ url: `${site.url}/areas/${area.slug}` })),
    ...homeownerGuides.map(guide => ({ url: `${site.url}/guides/${guide.slug}`, lastModified: "2026-09-07" })),
  ];
}
