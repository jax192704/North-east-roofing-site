import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Compile the pure helper without depending on a browser or a TS-specific test runner.
const source = await readFile(new URL("../lib/question-search.ts", import.meta.url), "utf8");
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { searchQuestions, relatedQuestions } = await import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
const items = [
  { slug: "cost", question: "How much does a new roof cost?", summary: "Replacement prices depend on roof size and materials.", topicSlug: "costs-and-quotes" },
  { slug: "chimney", question: "Why does my roof leak around the chimney?", summary: "Check the junction and flashing.", topicSlug: "leaks-and-repairs" },
  { slug: "rain", question: "Why is my roof leaking in rain?", summary: "Wind-driven rain can enter a failed roof junction.", topicSlug: "leaks-and-repairs" },
  { slug: "hidden", question: "Can a roof leak without missing tiles?", summary: "Hidden details and underlay can fail.", topicSlug: "leaks-and-repairs" },
  { slug: "repair", question: "Can my roof be repaired?", summary: "A local repair can address a limited defect.", topicSlug: "leaks-and-repairs" },
  { slug: "valley", question: "What causes a valley leak?", summary: "The roof valley carries water from adjoining slopes.", topicSlug: "leaks-and-repairs" },
  { slug: "patch", question: "Why did a patch repair fail?", summary: "Check the underlying cause of the water entry.", topicSlug: "leaks-and-repairs" },
];

test("natural language and reordered synonyms find relevant answers", () => {
  assert.equal(searchQuestions("Please tell me replacement roofing prices", items)[0]?.slug, "cost");
  assert.equal(searchQuestions("chimney dripping", items)[0]?.slug, "chimney");
  assert.equal(searchQuestions("MY ROOF LEAKS WHEN IT RAINS", items)[0]?.slug, "rain");
  assert.equal(searchQuestions("fix roof", items)[0]?.slug, "repair");
});
test("empty, irrelevant and punctuation-only searches do not manufacture matches", () => {
  for (const query of ["", "  ", "what is it", "???", "purple bananas", "my roof purple bananas"]) {
    assert.deepEqual(searchQuestions(query, items), [], query);
  }
  assert.equal(searchQuestions("roof", items, 2).length, 2);
});
test("related answers exclude self, remain relevant and vary across pages", () => {
  const first = relatedQuestions(items[1], items);
  const second = relatedQuestions(items[2], items);
  assert.equal(first.length, 5);
  assert.equal(new Set(first.map(item => item.slug)).size, 5);
  assert.ok(first.every(item => item.slug !== "chimney" && item.topicSlug === "leaks-and-repairs"));
  assert.notDeepEqual(first.map(item => item.slug), second.map(item => item.slug));
  assert.deepEqual(relatedQuestions(items[0], items), []);
});
