import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { homeownerGuides, homeownerGuideBySlug } from "@/lib/homeowner-guides";
import { questionBySlug, site } from "@/lib/roofing-data";
import { pageMetadata } from "@/lib/seo";
import { RoofVideoPlayer } from "@/components/roof-video";
import { videoForGuide } from "@/lib/roof-videos";

export const generateStaticParams = () => homeownerGuides.map(({ slug }) => ({ slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = homeownerGuideBySlug(slug);
  if (!guide) notFound();
  return pageMetadata(guide.title, guide.description, `/guides/${slug}`, "article");
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = homeownerGuideBySlug(slug);
  if (!guide) notFound();
  const url = `${site.url}/guides/${slug}`;
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, mainEntityOfPage: url, datePublished: "2026-09-07", dateModified: "2026-09-07", author: { "@type": "Organization", name: site.name, url: site.url }, publisher: { "@id": `${site.url}/#publisher` } }}/>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` }, { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` }, { "@type": "ListItem", position: 3, name: guide.title, item: url }] }}/>
    <nav className="breadcrumb container-wide" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/guides">Guides</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.stage}</span></nav>
    <section className="answer-page-head"><div className="container-narrow"><p className="eyebrow">{guide.stage}</p><h1>{guide.title}</h1><p className="guide-meta">Published 7 September 2026 · North East Roof Answers</p><div className="guide-takeaway"><strong>Key takeaway</strong><span>{guide.takeaway}</span></div></div></section>
    <div className="section container-wide answer-layout"><article className="answer-article">
      {videoForGuide(slug) && <RoofVideoPlayer video={videoForGuide(slug)!}/> }
      <nav className="guide-contents" aria-label="On this page"><h2>On this page</h2><ol>{guide.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
      {guide.sections.map(section => <section className="guide-section" id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.checks && <ul className="guide-list">{section.checks.map(check => <li key={check}><CheckCircle2 aria-hidden="true"/>{check}</li>)}</ul>}</section>)}
      <section className="guide-sources"><h2>Reference guidance</h2><ul>{guide.sources.map(source => <li key={source.href}><a href={source.href}>{source.label}</a></li>)}</ul><p>Published by {site.operator}. General guidance, not a survey, certification or confirmation that your roof is safe. <Link href="/editorial-standards">Sources and editorial responsibility</Link>.</p></section>
      <div className="answer-quote-card"><div><p className="eyebrow">Apply this to your property</p><h2>Send the details to J&amp;L Welch.</h2><p>Use the quotation form to describe the issue, location and timescale. Your enquiry goes directly to the roofing company.</p></div><Link className="inline-button" href="/request-a-quote">Request a quotation <ArrowRight size={18}/></Link></div>
    </article><aside className="answer-sidebar"><div><h2>Related answers</h2>{guide.questionSlugs.map(questionSlug => { const question = questionBySlug(questionSlug); return question ? <Link href={`/questions/${questionSlug}`} key={questionSlug}>{question.question}<ArrowRight size={18}/></Link> : null; })}</div><div><h2>Other homeowner guides</h2>{homeownerGuides.filter(item => item.slug !== slug).map(item => <Link href={`/guides/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={18}/></Link>)}</div></aside></div>
  </main>;
}
