"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { questions, topics } from "@/lib/roofing-data";

export function QuestionSearch({compact=false}:{compact?:boolean}){const [query,setQuery]=useState("");const matches=useMemo(()=>{const needle=query.trim().toLowerCase();if(!needle)return[];return questions.filter(item=>`${item.question} ${item.summary} ${topics.find(t=>t.slug===item.topicSlug)?.name||""}`.toLowerCase().includes(needle)).slice(0,8)},[query]);return <div className={`answer-search ${compact?"compact":""}`}><div className="search-input-wrap"><Search/><Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask: Why is my roof leaking when it rains sideways?" aria-label="Search roofing questions"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear search"><X/></button>}</div>{query&&<div className="search-results">{matches.length?matches.map(item=><Link key={item.slug} href={`/questions/${item.slug}`}><span><strong>{item.question}</strong><small>{item.summary}</small></span><ArrowRight/></Link>):<div className="no-result"><strong>No exact answer yet.</strong><span>You can still request advice and a property-specific quotation.</span><Link href="/request-a-quote">Ask J&L Welch about it <ArrowRight/></Link></div>}</div>}</div>}
