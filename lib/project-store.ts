import {getUploads} from '@/lib/server-storage';
import type {Project} from '@/lib/project-protocol';
export async function projects():Promise<Project[]>{
  let bucket:R2Bucket;try{bucket=getUploads();}catch{return [];}
  const items:Project[]=[];let cursor:string|undefined;
  do{const page=await bucket.list({prefix:'published-projects/',cursor});
    for(const object of page.objects){if(!object.key.endsWith('.json'))continue;const record=await bucket.get(object.key);if(record)items.push(await record.json<Project>());}
    cursor=page.truncated?page.cursor:undefined;
  }while(cursor);
  return items.sort((a,b)=>b.completedDate.localeCompare(a.completedDate));
}
export async function projectForSlug(slug:string){if(!/^[a-z0-9-]{1,180}$/.test(slug))return;return (await projects()).find(p=>p.slug===slug);}
