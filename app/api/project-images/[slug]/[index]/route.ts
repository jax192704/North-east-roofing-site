import {projectForSlug} from '@/lib/project-store';
import {getUploads} from '@/lib/server-storage';
export const dynamic='force-dynamic';
export async function GET(_r:Request,{params}:{params:Promise<{slug:string;index:string}>}){
 const {slug,index}=await params;if(!/^\d$/.test(index))return new Response('Not found',{status:404});
 const project=await projectForSlug(slug),photo=project?.photos[Number(index)];if(!photo)return new Response('Not found',{status:404});
 const object=await getUploads().get(photo.key);if(!object)return new Response('Not found',{status:404});
 return new Response(object.body,{headers:{'Content-Type':photo.type,'Cache-Control':'public, max-age=300','X-Content-Type-Options':'nosniff'}});
}
