type SearchableQuestion = { slug: string; question: string; summary: string; topicSlug: string };

const stopWords = new Set("a an the i my me our we you your it its is are am was were be been being do does did can could should would will have has had to of for in on at by with from and or but if when where why what which how please need want get tell about this that there very".split(" "));
const synonyms: Record<string, string> = {
  leaking: "leak", leaks: "leak", leaked: "leak", dripping: "leak", drip: "leak",
  costs: "cost", costing: "cost", price: "cost", prices: "cost", pricing: "cost", much: "cost",
  quotation: "quote", quotations: "quote", quotes: "quote",
  replacement: "replace", replacing: "replace", replaced: "replace", reroof: "replace", reroofing: "replace",
  repaired: "repair", repairing: "repair", repairs: "repair", fixing: "repair", fix: "repair",
  roofs: "roof", roofing: "roof", tiles: "tile", slates: "slate", gutters: "gutter", guttering: "gutter",
  chimney: "chimney", chimneys: "chimney", warranties: "guarantee", warranty: "guarantee", guarantees: "guarantee",
  mouldy: "mould", mold: "mould", moldy: "mould", raining: "rain", rains: "rain",
};

export function searchTokens(value: string): string[] {
  return [...new Set((value.toLowerCase().match(/[a-z0-9]+/g) ?? [])
    .filter(word => word.length > 1 && !stopWords.has(word))
    .map(word => synonyms[word] ?? word))];
}

export function searchQuestions<T extends SearchableQuestion>(query: string, items: readonly T[], limit = 8): T[] {
  const tokens = searchTokens(query);
  if (!tokens.length) return [];
  return items.map((item, index) => {
    const title = new Set(searchTokens(item.question));
    const detail = new Set(searchTokens(`${item.summary} ${item.topicSlug}`));
    const matched = tokens.filter(token => title.has(token) || detail.has(token)).length;
    const score = tokens.reduce((total, token) => total + (title.has(token) ? 4 : detail.has(token) ? 1 : 0), 0);
    return { item, index, matched, score };
  }).filter(result => result.matched >= Math.ceil(tokens.length * 0.6))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit).map(result => result.item);
}

export function relatedQuestions<T extends SearchableQuestion>(item: T, items: readonly T[], limit = 5): T[] {
  const topic = items.filter(candidate => candidate.topicSlug === item.topicSlug);
  const index = topic.findIndex(candidate => candidate.slug === item.slug);
  const candidates = topic.filter(candidate => candidate.slug !== item.slug);
  // Nearby questions keep every answer connected, alongside the closest semantic matches.
  const neighbours = index < 0 ? [] : [topic[(index + 1) % topic.length], topic[(index + topic.length - 1) % topic.length]];
  const ranked = searchQuestions(item.question, candidates, limit);
  return [...new Map([...ranked.slice(0, 3), ...neighbours, ...candidates]
    .filter(candidate => candidate && candidate.slug !== item.slug)
    .map(candidate => [candidate.slug, candidate])).values()].slice(0, limit);
}
