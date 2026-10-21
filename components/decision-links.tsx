import Link from "next/link";
export function DecisionLinks() {
  return <section className="decision-links container-wide" aria-label="Tools for your next step"><Link href="/tools/roof-problem-checker"><span>Notice a problem?</span><strong>Find the next step for your roof</strong><small>Leaks, damp lofts, loose tiles, flat roofs and gutters →</small></Link><Link href="/buying-a-roof"><span>Planning work?</span><strong>Work through the roof buying guide</strong><small>Repair or replace, costs, materials and quotations →</small></Link><Link href="/tools/compare-roofing-quotes"><span>Already have quotes?</span><strong>Compare the complete proposals</strong><small>Totals, VAT, exclusions and missing details →</small></Link></section>;
}
