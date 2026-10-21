import Link from "next/link";
import { RoofProblemChecker } from "@/components/roof-problem-checker";
import { JsonLd } from "@/components/json-ld";
import { roofProblems, problemQuoteHref } from "@/lib/roof-problems";
import { questionBySlug, site } from "@/lib/roofing-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("What's Wrong With My Roof? Symptom & Next-Step Guide", "Choose leaks, loose tiles, damp lofts, standing water or overflowing gutters. Find safe checks, useful evidence and relevant North East roofing advice.", "/tools/roof-problem-checker");
export default function RoofProblemPage() {
  return <main><JsonLd data={{"@context":"https://schema.org","@type":"WebPage",name:"Roof problem checker",url:`${site.url}/tools/roof-problem-checker`,description:"A homeowner evidence and next-step guide, not a remote roof diagnosis."}}/>
    <section className="page-hero"><div className="container-wide"><p className="eyebrow light">Start with what you can see</p><h1>What is wrong with my roof?</h1><p>Describe the symptom, understand what evidence matters and find a sensible next step for your North East property.</p></div></section>
    <div className="container-wide section decision-layout"><div><aside className="safety-note"><h2>Immediate danger comes first</h2><p>If a ceiling is bulging, material is falling or water is affecting electrics, keep people clear and contact the appropriate emergency service or utility provider. Do not wait for an online enquiry response. Do not climb onto the roof to investigate.</p></aside><RoofProblemChecker/></div><aside className="decision-side"><h2>Browse the symptoms</h2>{roofProblems.map(item => <a href={`#${item.slug}`} key={item.slug}>{item.title}</a>)}<Link href="/guides/prepare-for-a-roof-survey">Prepare for a roof survey</Link><Link href="/buying-a-roof">Compare your roofing options</Link></aside></div>
    <section className="container-wide symptom-library"><h2>Roof symptoms explained</h2><p>Browse these guides directly, or use the checker above to focus on your concern.</p>{roofProblems.map(problem => <article id={problem.slug} key={problem.slug} className="symptom-guide"><h3>{problem.title}</h3><p>{problem.summary}</p>{problem.patterns.map(pattern => <details key={pattern.label}><summary>{pattern.label}</summary><p>{pattern.guidance}</p></details>)}<h4>What to record</h4><ul>{problem.checks.map(check => <li key={check}>{check}</li>)}</ul><p className="checker-caution">{problem.avoid}</p><div className="symptom-links">{problem.questions.map(slug => {const question = questionBySlug(slug); return question ? <Link href={`/questions/${slug}`} key={slug}>{question.question}</Link> : null;})}<Link href={problemQuoteHref(problem)}>Ask J&amp;L Welch about this problem</Link></div></article>)}
    <p className="decision-source">Safety reference: <a href="https://www.hse.gov.uk/construction/safetytopics/roofwork.htm">HSE roof-work guidance</a>. Guidance reviewed 21 October 2026. <Link href="/editorial-standards">Editorial responsibility</Link>.</p></section>
  </main>;
}
