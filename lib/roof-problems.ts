export type RoofProblem = {
  slug: string; title: string; category: string; summary: string;
  patterns: { label: string; guidance: string }[];
  checks: string[]; avoid: string; questions: string[];
};

export const roofProblems: RoofProblem[] = [
  {
    slug: "leak", title: "Water coming through a ceiling", category: "Active roof leak",
    summary: "A ceiling stain shows where water appeared, not necessarily where it entered the roof. Record the pattern before choosing a repair.",
    patterns: [
      { label: "During ordinary rain", guidance: "Record the time rain starts and when water appears. A roofer needs to inspect the covering and the junctions upslope of the affected area; plumbing can also need investigation." },
      { label: "Only with wind-driven rain", guidance: "Note the wind direction if known. Flashings, abutments and penetrations may behave differently in wind-driven rain. This pattern does not identify a single failed component." },
      { label: "Unclear, or even in dry weather", guidance: "Record bathroom use, heating and cold mornings as well as rainfall. Condensation, plumbing and rain entry can produce similar marks and can occur together." },
    ],
    checks: ["Photograph the affected room and a wider view locating the stain.", "Record when it started, whether it is growing and any previous repairs.", "Take an external overview from ground level only."],
    avoid: "Do not climb onto the roof, puncture a bulging ceiling or touch wet electrical fittings.",
    questions: ["how-do-i-find-where-a-roof-leak-is-coming-from", "can-a-roof-leak-without-missing-tiles", "why-is-my-roof-leaking-only-when-it-rains-sideways"],
  },
  {
    slug: "loose-covering", title: "A slipped, cracked or missing tile or slate", category: "Slate or tile work",
    summary: "A displaced covering needs assessment even if the room below is dry. The next step depends on the surrounding roof, fixings and safe access.",
    patterns: [
      { label: "One visible defect", guidance: "A local repair may be possible if neighbouring coverings, fixings and the underlying system are serviceable. Ask the roofer to explain what can be confirmed and what remains concealed." },
      { label: "Several defects or repeated repairs", guidance: "Ask for evidence showing whether damage is local or widespread. Several failures can justify a wider survey; they do not automatically prove that a full replacement is necessary." },
      { label: "After strong winds", guidance: "Keep clear of the area beneath loose material. When safe, take ground-level photographs and preserve records for your insurer if you intend to contact it. Cover depends on the actual policy and cause." },
    ],
    checks: ["Photograph the whole roof slope, then zoom from a safe ground-level position.", "Note whether debris has fallen and keep people away from the area.", "Tell the roofer about solar panels, conservatories and access restrictions."],
    avoid: "Do not retrieve debris from the roof or attempt a ladder inspection to count the damage.",
    questions: ["is-a-loose-tile-dangerous", "why-do-roof-tiles-crack", "what-should-i-do-after-storm-damage-to-my-roof"],
  },
  {
    slug: "damp-loft", title: "A damp loft or droplets under the roof", category: "Condensation or insulation",
    summary: "Moisture can come from rain entry, condensation or both. Timing, distribution and recent insulation or ventilation changes help an inspection.",
    patterns: [
      { label: "Mostly on cold mornings", guidance: "Record whether moisture is widespread or concentrated. Tell the inspector about extraction, loft insulation and blocked openings. A cold-weather pattern is useful evidence, not a confirmed condensation diagnosis." },
      { label: "Mostly during or after rain", guidance: "Record the position and timing, including whether wind affects it. A roof survey may need to consider coverings and junctions alongside moisture and ventilation inside the loft." },
      { label: "Started after insulation or roof work", guidance: "Keep the specification and before-and-after photographs. Ask the contractor to review the whole ventilation and insulation arrangement rather than adding vents without diagnosis." },
    ],
    checks: ["Use existing safe access only; never walk on ceiling plasterboard.", "Record the weather and rooms producing moisture below.", "Keep any recent insulation, extractor or reroof specifications."],
    avoid: "Do not block or cut new ventilation openings, disturb suspect asbestos or move electrical fittings to investigate.",
    questions: ["why-is-there-condensation-in-my-loft", "why-is-my-bedroom-ceiling-cold-after-a-new-roof", "do-i-need-building-regulations-for-a-new-roof"],
  },
  {
    slug: "flat-roof-water", title: "Standing water or a problem on a flat roof", category: "Flat roof",
    summary: "Water behaviour must be considered with the drainage design, deck, falls, membrane and internal signs. A photograph alone cannot confirm a suitable repair.",
    patterns: [
      { label: "Water remains after rain", guidance: "Record how long it remains and whether the area changes over time. Ask for assessment of falls, outlets and deck condition against the installed system's guidance; do not assume a new membrane alone will correct drainage." },
      { label: "There is an internal leak", guidance: "Keep a record of the leak timing and location. The inspection should consider outlets, laps, rooflights, abutments and the condition beneath the covering, not only the visible wet patch." },
      { label: "The covering looks cracked or blistered", guidance: "Photograph the change from a safe location. An inspector should distinguish a local defect from a wider covering or substrate problem before recommending patching, overlay or renewal." },
    ],
    checks: ["Identify the covering only if already known; send any invoice or guarantee.", "Photograph the whole roof and visible outlet from a safe window or ground position.", "Tell the roofer about rooflights, rooftop equipment and any previous overlays."],
    avoid: "Do not walk onto an unassessed flat roof, drill drainage holes or cover the area with an unspecified coating.",
    questions: ["is-standing-water-on-a-flat-roof-normal", "which-flat-roof-system-is-best", "can-a-flat-roof-be-installed-over-an-old-roof"],
  },
  {
    slug: "gutters", title: "Overflowing gutters or water down the wall", category: "Fascia, soffit or guttering",
    summary: "Overflow can involve debris, joint failure, alignment or capacity. Watch where water escapes during ordinary rainfall from a safe position.",
    patterns: [
      { label: "Overflow along the gutter", guidance: "Record whether the overflow is widespread or near an outlet. An inspection can distinguish restrictions, alignment and capacity; cleaning alone will not solve every cause." },
      { label: "Dripping at one joint", guidance: "Show the joint in context and note whether it leaks in ordinary rain. The assessment should include supports and movement as well as the seal." },
      { label: "Damp wall, but no obvious overflow", guidance: "Record the affected area inside and outside. Gutters, roof junctions and other wall defects can produce similar damp patterns, so describe the observation without assuming the source." },
    ],
    checks: ["Video the overflow during ordinary rain from ground level.", "Show the outlet, downpipe route and affected wall in the same overview where possible.", "Mention shared gutters, conservatories and difficult access."],
    avoid: "Do not lean from a window or climb a ladder to clear a blockage for the photograph.",
    questions: ["why-do-my-gutters-overflow-in-heavy-rain", "can-a-roof-leak-without-missing-tiles"],
  },
  {
    slug: "old-roof", title: "An ageing roof: repair or replace?", category: "Roof inspection",
    summary: "Age alone does not decide whether a roof needs replacing. Ask for evidence of the condition, spread of defects and limits of a repair.",
    patterns: [
      { label: "No leak, but worried about age", guidance: "Start with a condition survey rather than a replacement assumption. Ask which items are sound, which need maintenance and which require investigation." },
      { label: "Repairs keep returning", guidance: "Put previous repair descriptions and costs together. Ask whether the recurring issue is one unresolved defect or a wider system failure, and request comparable repair and renewal scopes where both are viable." },
      { label: "Considering a different material", guidance: "Ask for checks on roof pitch, loading, fixing design, appearance and any permissions before changing the covering. Compare the complete build-up rather than material cost alone." },
    ],
    checks: ["Gather previous reports, repair invoices and guarantees.", "Describe current symptoms separately from the age of the roof.", "Ask what is confirmed visually and what needs opening-up or specialist advice."],
    avoid: "Do not agree a full replacement solely on an age estimate or an unexplained photograph.",
    questions: ["how-do-i-know-if-i-need-a-new-roof", "how-many-times-can-a-roof-be-patched", "what-should-a-new-roof-quotation-include"],
  },
];

export function problemQuoteHref(problem: RoofProblem, pattern?: string) {
  const question = `${problem.title}${pattern ? ` — ${pattern}` : ""}. `;
  return `/request-a-quote?${new URLSearchParams({ category: problem.category, question }).toString()}`;
}
