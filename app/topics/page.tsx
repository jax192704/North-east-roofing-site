import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { questions, topics } from "@/lib/roofing-data";
export const metadata:Metadata={title:"Roofing Advice Topics"};
export default function TopicsPage(){return <main><section className="page-hero"><div className="container-wide"><p className="eyebrow light">Answer library</p><h1>Browse roofing advice by subject.</h1><p>Every topic connects the first question to the next decision a homeowner normally faces.</p></div></section><section className="section container-wide topic-grid">{topics.map((topic,index)=><Link href={`/topics/${topic.slug}`} key={topic.slug}><span className="topic-number">{String(index+1).padStart(2,"0")}</span><h2>{topic.name}</h2><p>{topic.description}</p><span className="text-link">{questions.filter(q=>q.topicSlug===topic.slug).length} answers <ArrowRight/></span></Link>)}</section></main>}
