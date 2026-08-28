import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, Info, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { questionBySlug, questions, site, topicBySlug } from "@/lib/roofing-data";

const topicGuidance: Record<string, { practice: string; inspection: string }> = {
  "leaks-and-repairs": {
    practice: "Water can travel along underlay, rafters and battens before it appears indoors, so the stain is a clue rather than proof of the entry point. A sound diagnosis combines the weather pattern, an internal loft inspection and a close external check of the covering and every nearby junction.",
    inspection: "Book an inspection when a leak is active or recurring, the source is unclear, timber or insulation is staying wet, or a previous patch has failed. Water near electrics, a sagging ceiling or loose material above a public area needs urgent attention.",
  },
  "new-roofs": {
    practice: "A reroof is a complete weatherproofing system, not simply a new layer of tiles. The quotation should join up the covering, underlay, graded battens, ventilation, insulation, ridges, verges, leadwork, timber repairs, scaffold, waste and compliance route.",
    inspection: "Ask for a full roof survey when defects are widespread, repairs keep moving from one area to another, the underlay is failing or the cost of repeated access is becoming uneconomic. The roofer should show why replacement is justified and separate confirmed work from hidden-work allowances.",
  },
  "flat-roofs": {
    practice: "Flat-roof performance depends on the whole build-up: structural deck, vapour control, insulation, falls, waterproofing, outlets, kerbs and edge details. Choosing a branded membrane while ignoring trapped moisture or poor drainage simply locks the original fault beneath a new surface.",
    inspection: "Arrange a survey for recurring leaks, soft or deflected decking, persistent ponding, split details, blistering or an unknown build-up. Openings may be needed before anyone can responsibly confirm whether an overlay is suitable or the roof must be stripped.",
  },
  "costs-and-quotes": {
    practice: "Compare quotations line by line, including VAT, scaffold, waste, exact products, insulation, ventilation, leadwork, timber allowances, Building Control, payment terms and guarantees. A low total created by missing essential work is not a saving—it is an unpriced variation waiting to happen.",
    inspection: "Get a measured, written quotation before committing to substantial work. Ask questions wherever wording is vague, and insist that hidden defects are photographed and priced for approval before extra work proceeds, except where immediate safety action is unavoidable.",
  },
  "tiles-slates-and-materials": {
    practice: "The product must suit the roof pitch, exposure, fixing zone, headlap, supporting structure and appearance of the building. Substituting a similar-looking tile or slate without checking the manufacturer’s fixing specification can create wind-uplift, weight and weathering problems.",
    inspection: "Ask for the exact manufacturer and product in the quotation, not a generic description such as ‘grey tile’. A survey is important before changing covering type, reusing battens or mixing old and new materials on an exposed North East roof.",
  },
  "insulation-and-ventilation": {
    practice: "Heat loss, air leakage, vapour movement and ventilation must be designed together. Adding insulation without maintaining the intended air path—or assuming a breathable membrane solves every moisture risk—can move condensation into concealed parts of the roof.",
    inspection: "Seek a build-up-specific assessment when condensation persists, timbers remain damp, insulation has been altered or a reroof changes a thermal element. Compliance is based on the complete construction and target U-value, not an insulation thickness copied from another roof.",
  },
  "chimneys-leadwork-and-roofline": {
    practice: "Chimneys, valleys, abutments, ridges, verges and eaves are where different materials and movements meet. Repairs must address the supporting masonry or timber as well as the visible lead, mortar, plastic or metal finish.",
    inspection: "Arrange close inspection for loose masonry, repeated staining around a chimney, split lead, detached verge units or gutters that still overflow after cleaning. Scaffold-dependent repairs should be grouped where sensible so access is not paid for twice.",
  },
  "guarantees-and-building-control": {
    practice: "A useful handover proves what was installed, who is responsible and how compliance was achieved. Product warranties, workmanship guarantees, insurance-backed cover and Building Regulations certificates are different documents and should not be presented as interchangeable.",
    inspection: "Confirm the compliance and guarantee route before work starts, not after the scaffold comes down. At completion, check the property address, scope, dates, exclusions, transfer rules and issuing organisation, then retain the documents with the invoice and photographs.",
  },
  "storms-insurance-and-emergencies": {
    practice: "The first priority is people and property safety, followed by reasonable temporary protection and clear evidence. Insurers normally distinguish sudden insured damage from age, wear and poor maintenance, so an accurate cause report matters more than dramatic wording.",
    inspection: "Use urgent help for loose coverings, unstable masonry, water near electrics or a saturated ceiling. Photograph conditions from a safe position before and after temporary work, keep receipts and contact the insurer before irreversible replacement unless safety demands immediate action.",
  },
  "maintenance-and-home-buying": {
    practice: "Roof condition is better judged from evidence than age alone. External lines and junctions, loft moisture, timber condition, drainage, previous repairs and the paperwork for major work together give a more reliable picture of remaining risk.",
    inspection: "Commission a specialist inspection where a general survey flags concern, access prevented a proper view, recent work has no compliance documents or the likely repair could affect the purchase price. Budget separately for work that requires scaffold or specialist access.",
  },
};

export function generateStaticParams() {
  return questions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = questionBySlug(slug);
  if (!item) return {};
  return { title: item.question, description: item.summary, alternates: { canonical: `/questions/${slug}` } };
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = questionBySlug(slug);
  if (!item) notFound();
  const topic = topicBySlug(item.topicSlug);
  const guidance = topicGuidance[item.topicSlug];
  const related = questions.filter((question) => question.topicSlug === item.topicSlug && question.slug !== item.slug).slice(0, 5);
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: item.question, description: item.summary, mainEntityOfPage: `${site.url}/questions/${item.slug}`, datePublished: "2026-08-28", dateModified: "2026-08-28", author: { "@type": "Organization", name: site.operator, url: site.companyWebsite }, reviewedBy: { "@type": "Organization", name: site.operator, url: site.companyWebsite }, publisher: { "@id": `${site.url}/#publisher` }, about: topic?.name };

  return <main>
    <JsonLd data={schema}/>
    <div className="breadcrumb container-wide"><Link href="/">Home</Link><ChevronRight/><Link href="/questions">Questions</Link><ChevronRight/><Link href={`/topics/${topic?.slug}`}>{topic?.name}</Link></div>
    <section className="answer-page-head"><div className="container-narrow"><p className="eyebrow">{topic?.name}</p><h1>{item.question}</h1><p className="direct-answer"><strong>Short answer:</strong> {item.summary}</p></div></section>
    <section className="section container-wide answer-layout">
      <article className="answer-article">
        <h2>What this means in practice</h2><p>{guidance.practice}</p>
        <div className="key-answer-box"><h2>What to check next</h2><ul>{item.points.map((point) => <li key={point}><CheckCircle2/>{point}</li>)}</ul></div>
        <h2>When should you ask a roofer to inspect it?</h2><p>{guidance.inspection}</p>
        <div className="safety-note"><Info/><p><strong>Safety first:</strong> do not climb onto a roof without suitable access, training and protection. Keep clear of loose coverings, unstable ceilings and water near electrical fittings.</p></div>
        <div className="editorial-review"><strong>Technical content review</strong><span>{site.operator} · Over 20 years of combined roofing experience</span><span>Reviewed 28 August 2026 · <Link href="/editorial-standards">How our answers are produced</Link></span></div>
        <div className="answer-quote-card"><div><p className="eyebrow">Would you like a property-specific answer?</p><h2>Request an inspection and written quotation from J&amp;L Welch.</h2><p>No deposit is required. Payment is due on completion within seven days, with the agreed scope and price confirmed in writing.</p></div><Button asChild size="lg" className="answer-accent"><Link href={`/request-a-quote?question=${encodeURIComponent(item.question)}`}>Request a quotation <ArrowRight/></Link></Button></div>
      </article>
      <aside className="answer-sidebar"><div><ShieldCheck/><h2>J&amp;L Welch Roofing</h2><p>CompetentRoofer registered, with more than 20 years of combined roofing experience and written, property-specific specifications.</p><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></div><div><MapPin/><h2>North East coverage</h2><p>Durham, Newcastle, Sunderland, Gateshead, Chester-le-Street and surrounding areas.</p><Link href="/areas">Check your area <ArrowRight/></Link></div></aside>
    </section>
    <section className="related-section"><div className="container-wide"><p className="eyebrow">People also ask</p><h2>Related {topic?.name.toLowerCase()} questions</h2><div className="related-grid">{related.map((question) => <Link href={`/questions/${question.slug}`} key={question.slug}>{question.question}<ArrowRight/></Link>)}</div></div></section>
  </main>;
}
