import { HomeownerGuideLinks } from "@/components/homeowner-guide-links";
import { JsonLd } from "@/components/json-ld";
import { homeownerGuides } from "@/lib/homeowner-guides";
import { site } from "@/lib/roofing-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Practical Roofing Guides & Homeowner Checklists", "Prepare for a roof survey, compare quotations, check completed work and plan seasonal maintenance with practical North East homeowner guides.", "/guides");
export default function GuidesPage() {
  return <main><JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Practical roofing guides", url: `${site.url}/guides`, mainEntity: { "@type": "ItemList", itemListElement: homeownerGuides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: `${site.url}/guides/${guide.slug}` })) } }}/>
    <section className="page-hero"><div className="container-wide"><p className="eyebrow light">From first concern to aftercare</p><h1>Know what to ask. Know what to keep.</h1><p>Practical checklists for the survey, the quotation, the handover and the years after the work. Use them alongside the answer library and your property-specific specification.</p></div></section>
    <HomeownerGuideLinks/>
  </main>;
}
