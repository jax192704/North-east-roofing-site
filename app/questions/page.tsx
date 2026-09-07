import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuestionSearch } from "@/components/question-search";
import { questions, topics } from "@/lib/roofing-data";
import { pageMetadata } from "@/lib/seo";
export const metadata:Metadata=pageMetadata("All Roofing Questions","Search plain-English answers to common and conversational roofing questions from North East homeowners.","/questions");
export default function QuestionsPage(){return <main><section className="question-index-head"><div className="container-wide"><p className="eyebrow">Roofing answer library</p><h1>What would you like to know?</h1><p>Search naturally or browse every question by subject.</p><QuestionSearch compact/></div></section><section className="section container-wide question-groups">{topics.map(topic=>{const items=questions.filter(q=>q.topicSlug===topic.slug);return <section key={topic.slug}><div><p className="eyebrow">{items.length} answers</p><h2>{topic.name}</h2><p>{topic.description}</p></div><div>{items.map(item=><Link href={`/questions/${item.slug}`} key={item.slug}><span>{item.question}</span><ArrowRight/></Link>)}</div></section>})}</section></main>}
