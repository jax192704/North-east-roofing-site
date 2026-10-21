import {readFile,readdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';
const origin='https://northeastroofanswers.co.uk';
test('signed projects stay private until complete, reject old approvals, and update one page',async()=>{
 const keys=await crypto.subtle.generateKey({name:'ECDSA',namedCurve:'P-256'},true,['sign','verify']);
 const publicKey=Buffer.from(await crypto.subtle.exportKey('spki',keys.publicKey)).toString('base64');
 const source=await readFile(new URL('../lib/project-protocol.ts',import.meta.url),'utf8');
 const original=source.match(/publisherPublicKey = '([^']+)'/)[1];
 const require=createRequire(import.meta.url),wranglerRequire=createRequire(require.resolve('wrangler/package.json')),{Miniflare}=wranglerRequire('miniflare');
 const root=fileURLToPath(new URL('../dist/server/',import.meta.url));
 const files=['index.js',...(await readdir(root,{recursive:true})).filter(f=>f.endsWith('.js')&&f!=='index.js')];
 const modules=await Promise.all(files.map(async f=>({type:'ESModule',path:path.join(root,f),contents:(await readFile(path.join(root,f),'utf8')).replaceAll(original,publicKey)})));
 const worker=new Miniflare({modulesRoot:root,modules,compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],r2Buckets:['BUCKET'],serviceBindings:{ASSETS:()=>new Response('Not found',{status:404})}});
 const key='a'.repeat(64),revision='11111111-1111-4111-8111-111111111111';
 async function send(fields,{unsigned=false,expired=false}={}){const body=JSON.stringify({key,revision,sentAt:Date.now()-(expired?3600000:0),...fields}),signature=Buffer.from(await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},keys.privateKey,new TextEncoder().encode(body))).toString('base64');return worker.dispatchFetch(origin+'/api/project-publisher',{method:'POST',headers:{'Content-Type':'application/json',...(unsigned?{}:{'x-project-signature':signature})},body});}
 try{
  assert.equal((await send({action:'probe'},{unsigned:true})).status,403);
  assert.equal((await send({action:'probe'},{expired:true})).status,403);
  assert.equal((await send({action:'probe'})).status,200);
  const details={action:'begin',location:'Durham',summary:'Replaced the flat roof covering. New felt and edge trims.',completedDate:'2026-10-20',approvedAt:'2026-10-21T12:00:00Z',photoCount:1};
  assert.equal((await send(details)).status,200);
  assert.equal((await send({action:'commit'})).status,409,'incomplete photo set cannot go public');
  const slug='durham-'+key.slice(0,12);
  assert.equal((await worker.dispatchFetch(origin+'/projects/'+slug)).status,404);
  assert.equal((await send({action:'photo',index:0,type:'image/jpeg',data:Buffer.from([255,216,255,217]).toString('base64')})).status,200);
  const commit=await send({action:'commit'});assert.equal(commit.status,200);assert.equal((await commit.json()).url,origin+'/projects/'+slug);
  const page=await worker.dispatchFetch(origin+'/projects/'+slug);assert.equal(page.status,200);const html=await page.text();assert.match(html,/Replaced the flat roof covering/);assert.match(html,/Request a roofing quote/);
  assert.equal((await worker.dispatchFetch(origin+'/api/project-images/'+slug+'/0')).status,200);
  assert.equal((await worker.dispatchFetch(origin+'/api/project-images/'+slug+'/9')).status,404);
  assert.equal((await send({...details,approvedAt:'2026-10-19T12:00:00Z'})).status,409);
  assert.equal((await send({...details,summary:'Updated approved summary.',approvedAt:'2026-10-21T13:00:00Z'})).status,200);
  assert.equal((await send({action:'commit'})).status,200);
  const bucket=await worker.getR2Bucket('BUCKET');assert.equal((await bucket.list({prefix:'published-projects/'})).objects.length,1);
  const sitemap=await (await worker.dispatchFetch(origin+'/sitemap.xml')).text();assert.equal(sitemap.split(origin+'/projects/'+slug).length-1,1);
 }finally{await worker.dispose();}
});
