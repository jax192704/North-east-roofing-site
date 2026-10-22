import {readFile} from 'node:fs/promises';
import {stripTypeScriptTypes,createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),wranglerRequire=createRequire(require.resolve('wrangler/package.json'));
const {Miniflare}=wranglerRequire('miniflare');
const worker=new Miniflare({modules:true,script:'export default {fetch(){return new Response("test")}}',compatibilityDate:'2026-05-15',d1Databases:['DB']});
try{
 globalThis.__enquiryTestDB=await worker.getD1Database('DB');
 const notificationSource=stripTypeScriptTypes(await readFile(new URL('../lib/enquiry-notifications.ts',import.meta.url),'utf8'));
 globalThis.__notificationHelpers=await import('data:text/javascript;base64,'+Buffer.from(notificationSource).toString('base64'));
 const original=await readFile(new URL('../app/api/jobs/route.ts',import.meta.url),'utf8');
 const code=stripTypeScriptTypes(original.replace('import { env } from "cloudflare:workers";','const env={};').replace('import {prepareEnquiryOutbox,deliverEnquiryNotifications} from "@/lib/enquiry-notifications";','const {prepareEnquiryOutbox,deliverEnquiryNotifications}=globalThis.__notificationHelpers;').replace('import { getDatabase, getUploads } from "@/lib/server-storage";','const getDatabase=()=>globalThis.__enquiryTestDB; const getUploads=()=>{throw Error("Storage unavailable")};'));
 const {POST}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
 function request(valid=true,photo=false){const f=new FormData();for(const [k,v] of Object.entries({firstName:'System test',email:'test@example.com',phone:'07700900000',postcode:'DH1 1AA',category:'Roof repair',urgency:'Planning ahead',propertyType:'Detached',description:valid?'System test of enquiry storage, no customer contact required.':'short',consent:'true'}))f.set(k,v);if(photo)f.set('photos',new File([new Uint8Array([255,216,255,217])],'test.jpg',{type:'image/jpeg'}));return new Request('https://example.test/api/jobs',{method:'POST',body:f});}
 assert.equal((await POST(request(false))).status,400);
 assert.equal((await __enquiryTestDB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='jobs'").all()).results.length,0);
 const first=await POST(request());assert.equal(first.status,201);const id=(await first.json()).id;
 const second=await POST(request(true,true));assert.equal(second.status,201);assert.match((await second.json()).message,/Some photographs did not upload/);
 assert.equal((await __enquiryTestDB.prepare('SELECT COUNT(*) AS n FROM jobs').first()).n,2);
 assert.equal((await __enquiryTestDB.prepare('SELECT first_name FROM jobs WHERE id=?').bind(id).first()).first_name,'System test');
 console.log('PASS: empty database accepts enquiry, existing enquiry survives later submissions, validation rejects incomplete form, photo failure preserves lead.');
}finally{delete globalThis.__enquiryTestDB;delete globalThis.__notificationHelpers;await worker.dispose();}
