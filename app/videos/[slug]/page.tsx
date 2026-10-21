import Link from "next/link";
import {notFound} from "next/navigation";
import {RoofVideoPlayer} from "@/components/roof-video";
import {JsonLd} from "@/components/json-ld";
import {roofVideos,videoBySlug,videoSchema,videoPoster} from "@/lib/roof-videos";
import {pageMetadata} from "@/lib/seo";
import {site} from "@/lib/roofing-data";
export const generateStaticParams=()=>roofVideos.map(v=>({slug:v.slug}));
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const v=videoBySlug((await params).slug);if(!v)notFound();const meta=pageMetadata(`${v.title} — Video`,v.description,`/videos/${v.slug}`);return {...meta,openGraph:{...meta.openGraph,images:[`${site.url}${videoPoster(v)}`]}};}
export default async function VideoPage({params}:{params:Promise<{slug:string}>}){const v=videoBySlug((await params).slug);if(!v)notFound();return <main><JsonLd data={videoSchema(v)}/><nav className="breadcrumb container-wide" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/videos">Videos</Link><span>/</span><span>{v.title}</span></nav><section className="container-wide roof-watch-head"><p className="eyebrow">Short roofing explainer</p><h1>{v.title}</h1></section><div className="container-wide"><RoofVideoPlayer video={v} watchPage/></div><section className="section container-narrow answer-article"><h2>Put the advice into context</h2><p>This short video explains the first questions to ask. It does not establish the condition of your roof or replace a property-specific survey.</p><p><Link href={v.adviceHref}>Read the detailed advice and use the related tool →</Link></p><Link className="inline-button" href={`/request-a-quote?question=${encodeURIComponent(v.title)}`}>Ask J&amp;L Welch about your roof</Link><h2>More short roofing videos</h2><ul>{roofVideos.filter(item=>item.slug!==v.slug).map(item=><li key={item.slug}><Link href={`/videos/${item.slug}`}>{item.title}</Link></li>)}</ul></section></main>;}
