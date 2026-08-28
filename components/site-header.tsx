"use client";
import Link from "next/link";
import { Menu, MessageCircleQuestion, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/roofing-data";
const links=[["All questions","/questions"],["Topics","/topics"],["North East areas","/areas"],["About the advice","/about"]];
export function SiteHeader(){const [open,setOpen]=useState(false);return <header className="site-header"><div className="top-strip"><span>Plain-English roofing guidance for North East homeowners</span><span>Quotation service operated by J&L Welch Roofing</span></div><div className="nav-shell"><Link href="/" className="answer-brand" aria-label="North East Roof Answers home"><span className="answer-mark"><MessageCircleQuestion/></span><span><strong>NORTH EAST</strong><small>ROOF ANSWERS</small></span></Link><nav className="desktop-nav">{links.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</nav><div className="nav-actions"><a className="phone-link" href={`tel:${site.phone}`}><Phone/> {site.phoneDisplay}</a><Button asChild className="quote-button"><Link href="/request-a-quote">Request a quote</Link></Button><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div></div>{open&&<nav className="mobile-nav">{links.map(([label,href])=><Link href={href} key={href} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/request-a-quote" onClick={()=>setOpen(false)}>Request a quotation</Link></nav>}</header>}
