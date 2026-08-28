import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/roofing-data";
import "./globals.css";

export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:"North East Roof Answers | Clear Roofing Advice",template:"%s | North East Roof Answers"},description:"Plain-English answers to North East homeowners’ roofing questions, with an optional property-specific quotation from J&L Welch Roofing & Paving Services Ltd.",applicationName:site.name,alternates:{canonical:"/"},icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},openGraph:{type:"website",locale:"en_GB",siteName:site.name,title:"North East Roof Answers",description:"Ask a roofing question. Get a straight answer. Request a quotation if you need one.",url:site.url}};
const organisation={"@context":"https://schema.org","@type":"Organization","@id":`${site.url}/#publisher`,name:site.name,url:site.url,parentOrganization:{"@type":"RoofingContractor",name:site.operator,url:site.companyWebsite,telephone:site.phone,address:{"@type":"PostalAddress",streetAddress:"Low Crows House",addressLocality:"Wheatley Hill",addressRegion:"Durham",postalCode:"DH6 3QL",addressCountry:"GB"},areaServed:"North East England"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body><JsonLd data={organisation}/><SiteHeader/>{children}<SiteFooter/></body></html>}
