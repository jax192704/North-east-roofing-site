"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { questions } from "@/lib/roofing-data";
import { searchQuestions } from "@/lib/question-search";

export function QuestionSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const recorded = useRef(new Set<string>());
  const matches = useMemo(() => searchQuestions(query, questions), [query]);
  useEffect(() => {
    const cleaned = query.replace(/\s+/g, " ").trim();
    if (cleaned.length < 8 || matches.length || recorded.current.has(cleaned.toLowerCase())) return;
    const timer = window.setTimeout(() => {
      recorded.current.add(cleaned.toLowerCase());
      void fetch("/api/unanswered-searches", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: cleaned }) }).catch(() => {});
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [query, matches.length]);

  return <div className={`answer-search ${compact ? "compact" : ""}`}>
    <div className="search-input-wrap"><Search/>
      <Input value={query} onChange={event => setQuery(event.target.value)} maxLength={180} placeholder="Ask: Why is my roof leaking when it rains sideways?" aria-label="Search roofing questions" aria-controls="roof-question-results"/>
      {query && <button onClick={() => setQuery("")} aria-label="Clear search"><X/></button>}
    </div>
    <div id="roof-question-results" aria-live="polite" aria-atomic="true">
      {query.trim() && <div className="search-results">
        {matches.length ? matches.map(item => <Link key={item.slug} href={`/questions/${item.slug}`}><span><strong>{item.question}</strong><small>{item.summary}</small></span><ArrowRight/></Link>) : <div className="no-result"><strong>No close match yet.</strong><span>Try a shorter phrase such as “chimney leak” or “new roof cost”. We anonymously record unanswered searches to improve the library. Do not include names, addresses or contact details.</span><Link href="/request-a-quote">Ask J&amp;L Welch privately <ArrowRight/></Link></div>}
      </div>}
    </div>
  </div>;
}
