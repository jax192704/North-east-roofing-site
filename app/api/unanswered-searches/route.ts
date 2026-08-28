import { getDatabase } from "@/lib/server-storage";

const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const phonePattern = /(?:\+?44\s?|0)(?:\d[\s().-]?){9,10}/;

function clean(value: unknown) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, 180);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { query?: unknown };
    const query = clean(body.query);
    const normalized = normalize(query);

    if (query.length < 8 || normalized.length < 6 || emailPattern.test(query) || phonePattern.test(query)) {
      return Response.json({ recorded: false });
    }

    await getDatabase().prepare(`
      INSERT INTO unanswered_searches (id, query, normalized_query, search_count, status)
      VALUES (?, ?, ?, 1, 'unreviewed')
      ON CONFLICT(normalized_query) DO UPDATE SET
        query = excluded.query,
        search_count = unanswered_searches.search_count + 1,
        last_seen_at = CURRENT_TIMESTAMP
    `).bind(crypto.randomUUID(), query, normalized).run();

    return Response.json({ recorded: true }, { status: 201 });
  } catch {
    return Response.json({ recorded: false });
  }
}
