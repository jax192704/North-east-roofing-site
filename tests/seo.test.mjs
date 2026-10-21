import assert from "node:assert/strict";
import test, { before, after } from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { readdir } from "node:fs/promises";
import path from "node:path";

const origin = "https://northeastroofanswers.co.uk";
// Opt in only in an environment permitted to start the local Workers test runtime.
// Run after a build: ROOF_RUN_WORKER_TESTS=1 node --test tests/seo.test.mjs
const enabled = process.env.ROOF_RUN_WORKER_TESTS === "1";
let worker;
before(async () => {
  if (!enabled) return;
  const require = createRequire(import.meta.url);
  const wranglerRequire = createRequire(require.resolve("wrangler/package.json"));
  const { Miniflare } = wranglerRequire("miniflare");
  const serverRoot = fileURLToPath(new URL("../dist/server/", import.meta.url));
  const files = (await readdir(serverRoot, { recursive: true })).filter(file => file.endsWith(".js") && file !== "index.js");
  worker = new Miniflare({
    modulesRoot: serverRoot,
    modules: ["index.js", ...files].map(file => ({ type: "ESModule", path: path.join(serverRoot, file) })),
    compatibilityDate: "2026-05-15",
    compatibilityFlags: ["nodejs_compat"],
    r2Buckets: ["BUCKET"],
    serviceBindings: { ASSETS: () => new Response("Not found", { status: 404 }) },
  });
});
after(async () => { if (worker) await worker.dispose(); });
const request = path => worker.dispatchFetch(new URL(path, origin).href, { headers: { accept: "text/html" } });
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(match => attributes(match[0]));

test("every sitemap page is 200, self-canonical, indexable and internally linked", { skip: !enabled }, async t => {
  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, 259);
  assert.equal(new Set(urls).size, urls.length, "No duplicate sitemap URLs");
  const paths = new Set(urls.map(url => new URL(url).pathname));
  const incoming = new Set();
  const titles = new Set();
  for (const url of urls) {
    const response = await request(url);
    assert.equal(response.status, 200, `${url}: direct 200, not redirect or soft error`);
    assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex/i);
    const html = await response.text();
    const canonical = tags(html, "link").filter(tag => tag.rel === "canonical");
    assert.deepEqual(canonical.map(tag => tag.href), [url], `${url}: one self-canonical`);
    const meta = tags(html, "meta");
    assert.doesNotMatch(meta.filter(tag => /robots|googlebot/.test(tag.name ?? "")).map(tag => tag.content).join(" "), /noindex/i);
    assert.ok(meta.find(tag => tag.name === "description")?.content?.length > 20, `${url}: description`);
    assert.equal(meta.find(tag => tag.property === "og:url")?.content, url, `${url}: social URL`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${url}: single server-rendered H1`);
    const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    assert.ok(title, `${url}: title`);
    assert.ok(!titles.has(title), `${url}: unique page title`);
    titles.add(title);
    for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(match[1]), `${url}: valid structured data`);
    }
    for (const { href } of tags(html, "a")) {
      if (!href || !href.startsWith("/")) continue;
      const target = new URL(href.replaceAll("&amp;", "&"), origin).pathname;
      assert.ok(paths.has(target), `${url}: internal link ${target} exists in sitemap`);
      if (target !== new URL(url).pathname) incoming.add(target);
    }
  }
  for (const path of paths) assert.ok(incoming.has(path), `${path}: not an orphan`);
  t.diagnostic(`Checked ${urls.length} pages, their canonical tags, metadata, structured data and internal destinations.`);
});

test("invalid page slugs return a genuine 404", { skip: !enabled }, async () => {
  for (const path of ["/missing-roof-page", "/questions/missing-roof-page", "/areas/missing-area", "/topics/missing-topic", "/guides/missing-guide"]) {
    assert.equal((await request(path)).status, 404, path);
  }
});

test("query parameters do not become preferred indexing URLs", { skip: !enabled }, async () => {
  for (const path of ["/questions?utm_source=test", "/request-a-quote?area=Durham", "/guides/prepare-for-a-roof-survey?utm_source=test"]) {
    const response = await request(path);
    assert.equal(response.status, 200);
    const canonical = tags(await response.text(), "link").filter(tag => tag.rel === "canonical");
    assert.deepEqual(canonical.map(tag => tag.href), [`${origin}${path.split("?")[0]}`]);
  }
});

test("robots permits crawling and advertises the canonical sitemap", { skip: !enabled }, async () => {
  const response = await request("/robots.txt");
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.match(text, /User-Agent: \*/i);
  assert.match(text, /Allow: \//i);
  assert.match(text, /Sitemap: https:\/\/northeastroofanswers\.co\.uk\/sitemap\.xml/i);
  assert.doesNotMatch(text, /Disallow:\s*\/\s*$/im);
});
