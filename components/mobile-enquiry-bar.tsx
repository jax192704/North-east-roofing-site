"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/roofing-data";
export function MobileEnquiryBar() {
  const pathname = usePathname();
  if (pathname === "/request-a-quote" || pathname === "/privacy" || pathname === "/terms") return null;
  return <nav className="mobile-enquiry-bar" aria-label="Contact J&L Welch"><a href={`tel:${site.phone}`}>Call J&amp;L Welch</a><Link href="/request-a-quote">Send roof details</Link></nav>;
}
