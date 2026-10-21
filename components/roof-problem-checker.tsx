"use client";
import { useState } from "react";
import Link from "next/link";
import { roofProblems, problemQuoteHref } from "@/lib/roof-problems";
import { trackEvent } from "@/lib/analytics";

export function RoofProblemChecker() {
  const [slug, setSlug] = useState("");
  const [pattern, setPattern] = useState("");
  const problem = roofProblems.find(item => item.slug === slug);
  const observation = problem?.patterns.find(item => item.label === pattern);
  return <section className="problem-checker" aria-labelledby="checker-title">
    <p className="eyebrow">Find a useful next step</p><h2 id="checker-title">What have you noticed?</h2>
    <p>This guide helps you collect evidence. It does not diagnose the cause or decide that your roof needs replacing.</p>
    <label htmlFor="roof-symptom">1. Choose the closest symptom</label>
    <select id="roof-symptom" value={slug} onChange={event => { setSlug(event.target.value); setPattern(""); if(event.target.value) trackEvent("roof_checker_start"); }}>
      <option value="">Choose a symptom</option>{roofProblems.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}
    </select>
    {problem && <><label htmlFor="roof-pattern">2. Which pattern is closest?</label><select id="roof-pattern" value={pattern} onChange={event => {setPattern(event.target.value); if(event.target.value) trackEvent("roof_checker_result");}}><option value="">Choose a pattern</option>{problem.patterns.map(item => <option key={item.label} value={item.label}>{item.label}</option>)}</select></>}
    <div aria-live="polite" aria-atomic="true">{problem && observation && <div className="checker-result"><p className="eyebrow">Your next step</p><h3>{problem.title}</h3><p>{observation.guidance}</p><h4>Useful evidence to gather safely</h4><ul>{problem.checks.map(item => <li key={item}>{item}</li>)}</ul><p className="checker-caution">{problem.avoid}</p><div className="decision-actions"><Link className="inline-button" href={problemQuoteHref(problem, pattern)}>Send these details to J&amp;L Welch</Link><a href={`#${problem.slug}`}>Read the related advice</a></div><small>Your selection fills the enquiry topic. No details are sent until you submit the quotation form.</small></div>}</div>
    <noscript><p>Use the symptom guides below. Each includes evidence to record and a direct enquiry link.</p></noscript>
  </section>;
}
