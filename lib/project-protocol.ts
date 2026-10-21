// The private signing key lives only in the completion app's runtime secrets.
export const publisherPublicKey = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEt0bnAPa/y3TZg4RPQ/1uebwlfJlFR5JVB5/I0x/mBC0tPjTyl1DuzTJHOHBuXxmQd816C2Fy5xAQ0XlbvZYBOw==';
export const projectKey = /^[a-f0-9]{64}$/;
export const revisionKey = /^[a-f0-9-]{36}$/;
export type Project = {key:string;slug:string;revision:string;approvedAt:string;completedDate:string;location:string;summary:string;title:string;photos:{key:string;type:string}[]};
export function publicDetails(v:Record<string,unknown>){
  const location=String(v.location||'').trim(),summary=String(v.summary||'').trim();
  if(!location||location.length>120||!summary||summary.length>3000||!/^\d{4}-\d{2}-\d{2}$/.test(String(v.completedDate))||!Number.isFinite(Date.parse(String(v.approvedAt))))throw Error('Invalid approved public details');
  const count=Number(v.photoCount);if(!Number.isInteger(count)||count<1||count>10)throw Error('Invalid photo count');
  return {location,summary,completedDate:String(v.completedDate),approvedAt:String(v.approvedAt),photoCount:count};
}
export async function verifyPublisher(body:string,signature:string|null,now=Date.now(),publicKey=publisherPublicKey){
  if(!signature||!/^[-A-Za-z0-9+/=]+$/.test(signature))return false;
  try{const key=await crypto.subtle.importKey('spki',Uint8Array.from(atob(publicKey),c=>c.charCodeAt(0)),{name:'ECDSA',namedCurve:'P-256'},false,['verify']);
    if(!await crypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},key,Uint8Array.from(atob(signature),c=>c.charCodeAt(0)),new TextEncoder().encode(body)))return false;
    const b=JSON.parse(body);return typeof b.sentAt==='number'&&Math.abs(now-b.sentAt)<15*60*1000;
  }catch{return false;}
}
