import {readFile} from 'node:fs/promises';
import {stripTypeScriptTypes,createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),wranglerRequire=createRequire(require.resolve('wrangler/package.json'));
const {Miniflare}=wranglerRequire('miniflare');
const worker=new Miniflare({modules:true,script:'export default {fetch(){return new Response("test")}}',compatibilityDate:'2026-05-15',d1Databases:['DB']});
const originalFetch=globalThis.fetch;
try{
 const database=await worker.getD1Database('DB');
 const source=stripTypeScriptTypes(await readFile(new URL('../lib/enquiry-notifications.ts',import.meta.url),'utf8'));
 const {prepareEnquiryOutbox,deliverEnquiryNotifications}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 await prepareEnquiryOutbox(database);
 await database.prepare('INSERT INTO enquiry_notifications(id,payload) VALUES (?,?)').bind('test-id',JSON.stringify({id:'test-id',firstName:'System test'})).run();
 let calls=0;globalThis.fetch=async()=>{calls++;return new Response('Accepted',{status:200});};
 await deliverEnquiryNotifications(database,undefined);assert.equal(calls,0);
 await deliverEnquiryNotifications(database,'https://hook.eu2.make.com/test');
 assert.equal((await database.prepare('SELECT state FROM enquiry_notifications WHERE id=?').bind('test-id').first()).state,'pending');
 globalThis.fetch=async()=>{calls++;return Response.json({delivered:true,id:'test-id'});};
 await deliverEnquiryNotifications(database,'https://hook.eu2.make.com/test');
 assert.equal((await database.prepare('SELECT state FROM enquiry_notifications WHERE id=?').bind('test-id').first()).state,'sent');
 await deliverEnquiryNotifications(database,'https://hook.eu2.make.com/test');assert.equal(calls,2);
 console.log('PASS: missing connection retains pending notification; queue acceptance is not delivery; confirmed email is marked sent and not resent.');
}finally{globalThis.fetch=originalFetch;await worker.dispose();}
