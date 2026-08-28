import { env } from "cloudflare:workers";

export function getDatabase(): D1Database {
  if (!env.DB) throw new Error("Database unavailable");
  return env.DB;
}

export function getUploads(): R2Bucket {
  if (!env.BUCKET) throw new Error("Upload storage unavailable");
  return env.BUCKET;
}
