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

    const id = crypto.randomUUID();
    const files = form.getAll("photos").filter((item): item is File => item instanceof File && item.size > 0).slice(0, 5);
    const photoKeys: string[] = [];
    const bucket = getUploads();
    for (const file of files) {
      if (!allowedTypes.has(file.type) || file.size > 5_000_000) continue;
      const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
      const key = `jobs/${id}/${crypto.randomUUID()}.${extension}`;
      await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
      photoKeys.push(key);
    }

    await getDatabase().prepare(`INSERT INTO jobs (id, first_name, email, phone, postcode, town, category, urgency, property_type, description, photo_keys, consent, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted')`).bind(id, firstName, email, phone, postcode, town, category, urgency, propertyType, description, JSON.stringify(photoKeys), consent ? 1 : 0).run();
    return Response.json({ id, message: "Your enquiry has been sent to J&L Welch Roofing for review." }, { status: 201 });
  } catch {
    return Response.json({ error: "We could not submit the job. Please try again." }, { status: 500 });
  }
}
