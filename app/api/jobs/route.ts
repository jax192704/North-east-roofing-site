import { env } from "cloudflare:workers";
import {prepareEnquiryOutbox,deliverEnquiryNotifications} from "@/lib/enquiry-notifications";
import { getDatabase, getUploads } from "@/lib/server-storage";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
const value = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const firstName = value(form, "firstName");
    const email = value(form, "email").toLowerCase();
    const phone = value(form, "phone");
    const postcode = value(form, "postcode").toUpperCase();
    const town = value(form, "town");
    const category = value(form, "category");
    const urgency = value(form, "urgency");
    const propertyType = value(form, "propertyType");
    const description = value(form, "description");
    const consent = value(form, "consent") === "true";

    if (!firstName || !email || !phone || !postcode || !category || !urgency || !propertyType || description.length < 20 || !consent) {
      return Response.json({ error: "Please complete every required field and provide at least 20 characters about the job." }, { status: 400 });
    }
    if (!email.includes("@") || phone.replace(/\D/g, "").length < 10) {
      return Response.json({ error: "Please enter a valid email address and phone number." }, { status: 400 });
    }

    // External Cloudflare deployments do not run the Sites migration runner.
    // Provision the same additive schema before accepting an enquiry there.
    // IF NOT EXISTS preserves all previously saved enquiries.
    const database = getDatabase();
    await database.prepare(`CREATE TABLE IF NOT EXISTS jobs (
	id text PRIMARY KEY NOT NULL,
	first_name text NOT NULL,
	email text NOT NULL,
	phone text NOT NULL,
	postcode text NOT NULL,
	town text DEFAULT '' NOT NULL,
	category text NOT NULL,
	urgency text NOT NULL,
	property_type text NOT NULL,
	description text NOT NULL,
	photo_keys text DEFAULT '[]' NOT NULL,
	consent integer DEFAULT false NOT NULL,
	status text DEFAULT 'submitted' NOT NULL,
	created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL
);`).run();

    const id = crypto.randomUUID();
    const files = form.getAll("photos").filter((item): item is File => item instanceof File && item.size > 0).slice(0, 5);
    const photoKeys: string[] = [];
    let photosNotSaved = 0;

    for (const file of files) {
      if (!allowedTypes.has(file.type) || file.size > 5_000_000) continue;
      const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
      const key = `jobs/${id}/${crypto.randomUUID()}.${extension}`;
      try {
        await getUploads().put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
        photoKeys.push(key);
      } catch (error) {
        photosNotSaved += 1;
        console.error("Quotation photo upload failed", { id, key, error });
      }
    }

    await prepareEnquiryOutbox(database);
    const notification=JSON.stringify({id,firstName,email,phone,postcode,town,category,urgency,propertyType,description,photoCount:photoKeys.length,submittedAt:new Date().toISOString()});
    // Persist the enquiry and its pending notification together before delivery.
    await database.batch([
      database.prepare(`INSERT INTO jobs (id, first_name, email, phone, postcode, town, category, urgency, property_type, description, photo_keys, consent, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted')`).bind(id, firstName, email, phone, postcode, town, category, urgency, propertyType, description, JSON.stringify(photoKeys), consent ? 1 : 0),
      database.prepare("INSERT INTO enquiry_notifications(id,payload) VALUES (?,?)").bind(id,notification)
    ]);
    try{await deliverEnquiryNotifications(database,(env as unknown as {ENQUIRY_NOTIFICATION_WEBHOOK?:string}).ENQUIRY_NOTIFICATION_WEBHOOK);}catch{console.error('Enquiry email delivery deferred',{id});}

    return Response.json({
      id,
      message: photosNotSaved
        ? "Your enquiry has been received. Some photographs did not upload, but J&L Welch can still contact you."
        : "Your enquiry has been received for review by J&L Welch Roofing."
    }, { status: 201 });
  } catch (error) {
    console.error("Quotation submission failed", error);
    const detail = error instanceof Error ? error.message : String(error);
    const normalized = detail.toLowerCase();

    if (normalized.includes("database unavailable") || normalized.includes("binding") || normalized.includes("env.db")) {
      return Response.json({ error: "The quotation database is not connected. Reference DB01." }, { status: 503 });
    }
    if (normalized.includes("no such table") || normalized.includes("jobs")) {
      return Response.json({ error: "The quotation database needs its jobs table installed. Reference DB02." }, { status: 503 });
    }
    if (normalized.includes("d1")) {
      return Response.json({ error: "The quotation database rejected the request. Reference DB03." }, { status: 503 });
    }

    return Response.json({ error: "The quotation system returned an unknown server fault. Reference SYS01." }, { status: 500 });
  }
}
