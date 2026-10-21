import {getUploads} from '@/lib/server-storage';
import {projectKey,revisionKey,publicDetails,verifyPublisher,type Project} from '@/lib/project-protocol';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store'};
export async function POST(r:Request){
  if(Number(r.headers.get('content-length')||0)>12*1024*1024)return Response.json({error:'Too large'},{status:413,headers});
  const body=await r.text();if(body.length>12*1024*1024)return Response.json({error:'Too large'},{status:413,headers});
  if(!await verifyPublisher(body,r.headers.get('x-project-signature')))return Response.json({error:'Forbidden'},{status:403,headers});
  try{const b=JSON.parse(body),bucket=getUploads();
    if(b.action==='probe'){await bucket.list({prefix:'published-projects/',limit:1});return Response.json({ok:true},{headers});}
    if(!projectKey.test(b.key)||!revisionKey.test(b.revision))throw Error('Invalid reference');
    const path=`project-drafts/${b.key}/${b.revision}`,publishedPath=`published-projects/${b.key}.json`;
    const previousObject=await bucket.get(publishedPath),previous=previousObject?await previousObject.json<Project>():undefined;
    if(b.action==='begin'){
      const details=publicDetails(b);
      if(previous&&Date.parse(previous.approvedAt)>Date.parse(details.approvedAt))return Response.json({error:'A newer approval is published'},{status:409,headers});
      const locationSlug=details.location.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,100)||'north-east';
      const work=details.summary.split(/[.!?\n]/)[0].slice(0,85).trim();
      const draft={...details,key:b.key,revision:b.revision,slug:previous?.slug||`${locationSlug}-${b.key.slice(0,12)}`,title:`${work} — ${details.location}`};
      await bucket.put(`${path}/manifest.json`,JSON.stringify(draft));return Response.json({ok:true},{headers});
    }
    const raw=await bucket.get(`${path}/manifest.json`);if(!raw)return Response.json({error:'Project not staged'},{status:409,headers});
    const draft=await raw.json<Project&{photoCount:number}>();
    if(previous&&Date.parse(previous.approvedAt)>Date.parse(draft.approvedAt))return Response.json({error:'A newer approval is published'},{status:409,headers});
    if(b.action==='photo'){
      if(!Number.isInteger(b.index)||b.index<0||b.index>=draft.photoCount||!['image/jpeg','image/png','image/webp'].includes(b.type)||typeof b.data!=='string'||b.data.length>11200000)throw Error('Invalid photo');
      const bytes=Uint8Array.from(atob(b.data),c=>c.charCodeAt(0));if(!bytes.length||bytes.length>8*1024*1024)throw Error('Invalid photo size');
      await bucket.put(`${path}/photos/${b.index}`,bytes,{httpMetadata:{contentType:b.type}});return Response.json({ok:true},{headers});
    }
    if(b.action==='commit'){
      const photos=[];for(let i=0;i<draft.photoCount;i++){const key=`${path}/photos/${i}`,photo=await bucket.head(key);if(!photo)return Response.json({error:'Photo set incomplete'},{status:409,headers});photos.push({key,type:photo.httpMetadata?.contentType||'image/jpeg'});}
      const {photoCount,...fields}=draft;void photoCount;await bucket.put(publishedPath,JSON.stringify({...fields,photos}));
      return Response.json({ok:true,url:`https://northeastroofanswers.co.uk/projects/${draft.slug}`},{headers});
    }
    throw Error('Unknown action');
  }catch(e){console.error('Project publication failed',e instanceof Error?e.message:'Storage error');return Response.json({error:'Could not publish project'},{status:503,headers});}
}
