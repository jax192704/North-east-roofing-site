import type { MetadataRoute } from "next";
import { site } from "@/lib/roofing-data";
export default function robots():MetadataRoute.Robots{return{rules:[{userAgent:"*",allow:"/"},{userAgent:"OAI-SearchBot",allow:"/"},{userAgent:"ChatGPT-User",allow:"/"},{userAgent:"ClaudeBot",allow:"/"},{userAgent:"Googlebot",allow:"/"},{userAgent:"Bingbot",allow:"/"}],sitemap:`${site.url}/sitemap.xml`}}
