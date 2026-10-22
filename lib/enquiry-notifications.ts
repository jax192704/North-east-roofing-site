export async function prepareEnquiryOutbox(database:D1Database){
 await database.prepare(`CREATE TABLE IF NOT EXISTS enquiry_notifications (
 id TEXT PRIMARY KEY NOT NULL, payload TEXT NOT NULL,
 state TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0,
 last_attempt TEXT, sent_at TEXT, claim_token TEXT
 )`).run();
}
export async function deliverEnquiryNotifications(database:D1Database,webhook:string|undefined){
 if(!webhook)return;
 const url=new URL(webhook);if(url.protocol!=='https:'||url.hostname!=='hook.eu2.make.com')throw Error('Invalid enquiry notification destination');
 await prepareEnquiryOutbox(database);
 const claim=crypto.randomUUID(),now=new Date().toISOString(),cutoff=new Date(Date.now()-10*60*1000).toISOString();
 const claimed=await database.prepare(`UPDATE enquiry_notifications SET state='sending',claim_token=?,last_attempt=?,attempts=attempts+1
 WHERE id IN (SELECT id FROM enquiry_notifications WHERE state='pending' OR (state='sending' AND last_attempt<?) ORDER BY rowid LIMIT 5)
 RETURNING id,payload`).bind(claim,now,cutoff).all<{id:string;payload:string}>();
 for(const row of claimed.results){
  try{
   const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:row.payload,signal:AbortSignal.timeout(20000),redirect:'error'});
   const acknowledgement=await response.json() as {delivered?:boolean;id?:string};
   // Make acknowledges only after the Outlook send succeeds, never on queue acceptance.
   if(!response.ok||acknowledgement.delivered!==true||acknowledgement.id!==row.id)throw Error('Email delivery not confirmed');
   await database.prepare("UPDATE enquiry_notifications SET state='sent',sent_at=?,claim_token=NULL WHERE id=? AND claim_token=?").bind(new Date().toISOString(),row.id,claim).run();
  }catch{
   await database.prepare("UPDATE enquiry_notifications SET state='pending',claim_token=NULL WHERE id=? AND claim_token=?").bind(row.id,claim).run();
   console.error('Enquiry email deferred',{id:row.id});
  }
 }
}
