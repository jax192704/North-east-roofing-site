import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeownerGuides, guidesForTopic } from "@/lib/homeowner-guides";

export function HomeownerGuideLinks({ topicSlug }: { topicSlug?: string }) {
  const guides = topicSlug ? guidesForTopic(topicSlug) : homeownerGuides;
  if (!guides.length) return null;
  return <section className="section container-wide homeowner-guide-links" aria-label="Practical homeowner guides">
    <div className="section-heading"><div><p className="eyebrow">Put the advice into practice</p><h2>Checklists for your next step.</h2></div><Link href="/guides">All homeowner guides <ArrowRight size={18}/></Link></div>
    <p><Link href="/tools/compare-roofing-quotes">Compare up to three roofing quotes with our free calculator →</Link></p><div className="homeowner-guide-grid">{guides.map(guide => <Link href={`/guides/${guide.slug}`} key={guide.slug}><span className="eyebrow">{guide.stage}</span><h3>{guide.title}</h3><p>{guide.description}</p><strong>Open checklist <ArrowRight size={18}/></strong></Link>)}</div>
  </section>;
}
