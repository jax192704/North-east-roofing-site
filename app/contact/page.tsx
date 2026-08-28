import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/roofing-data";
export const metadata:Metadata={title:"Contact North East Roof Answers"};
export default function ContactPage(){return <main><section className="page-hero"><div className="container-wide"><p className="eyebrow light">Contact</p><h1>Ask the question or request a quotation.</h1><p>Quotation enquiries are handled directly by J&L Welch Roofing & Paving Services Ltd.</p></div></section><section className="section container-wide contact-cards"><a href={`mailto:${site.email}`}><Mail/><span><small>Email</small><strong>{site.email}</strong></span></a><a href={`tel:${site.phone}`}><Phone/><span><small>Telephone</small><strong>{site.phoneDisplay}</strong></span></a><div><MapPin/><span><small>Trading address</small><strong>{site.address}</strong></span></div></section><div className="center-action"><Link className="inline-button" href="/request-a-quote">Send a structured quotation request <ArrowRight/></Link></div></main>}
