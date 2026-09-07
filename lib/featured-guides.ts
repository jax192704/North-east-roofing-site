export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PriceRow = {
  item: string;
  guide: string;
  includes: string;
};

export type FeaturedGuide = {
  updated: string;
  readMinutes: number;
  keyTakeaway: string;
  sections: GuideSection[];
  priceRows?: PriceRow[];
  priceNote?: string;
  quoteChecklist: string[];
  sources?: { label: string; href: string }[];
};

const commonQuoteChecks = [
  "Exact roof covering, underlay, battens and fixing specification",
  "Scaffolding, waste removal and protection of the property",
  "Leadwork, ventilation, insulation and Building Regulations route",
  "How hidden timber defects and other variations will be evidenced and priced",
  "Workmanship guarantee, product cover, payment terms and completion documents",
];

export const featuredGuides: Record<string, FeaturedGuide> = {
  "how-much-does-a-new-roof-cost-in-the-north-east": {
    updated: "5 September 2026",
    readMinutes: 6,
    keyTakeaway: "Use a square-metre rate only for early budgeting. Scaffold, roof shape, leadwork, insulation and hidden timber repairs can move the final price materially.",
    sections: [
      {
        heading: "What controls the final price?",
        paragraphs: [
          "A simple two-sided roof with easy scaffold access is fundamentally cheaper than a roof with dormers, valleys, low-level extensions, solar panels and multiple chimney junctions. The covering is only part of the cost.",
          "A defensible quotation should measure the roof, identify the proposed system and separate confirmed work from reasonable allowances. A headline price without that detail is not comparable.",
        ],
        bullets: ["Total roof area and pitch", "Tile or slate product and fixing requirements", "Scaffold design and access", "Lead valleys, abutments and chimneys", "Insulation, ventilation and compliance", "Condition of rafters, deck and fascia structure"],
      },
      {
        heading: "A realistic early budget",
        paragraphs: ["The figures below reflect J&L Welch's broad 2026 North East pricing guidance. They are not offers and exclude unusual access, major structural work and project-specific extras unless stated."],
      },
      {
        heading: "Where cheap quotations usually break",
        bullets: ["Scaffold or VAT is omitted", "Generic materials are substituted after acceptance", "Insulation and ventilation are not properly specified", "Leadwork is patched around rather than renewed where required", "Rotten timber becomes an uncontrolled verbal extra", "Building Control and handover documents are left to the homeowner"],
      },
    ],
    priceRows: [
      { item: "Straightforward tiled reroof", guide: "From about £5,000 + VAT", includes: "Early starting point for a simple domestic roof; property survey required" },
      { item: "Concrete/clay tile covering", guide: "About £90/m² + VAT", includes: "Budget rate before project-specific scaffold, leadwork and structural repairs" },
      { item: "Man-made slate covering", guide: "About £100/m² + VAT", includes: "Budget rate subject to exact product, pitch, lap and fixing specification" },
      { item: "Spanish natural slate covering", guide: "About £110/m² + VAT", includes: "Budget rate subject to slate selection, grading, detailing and fixing" },
    ],
    priceNote: "Always compare the VAT-inclusive total. At 20% VAT, a £7,500 quotation excluding VAT becomes £9,000 payable.",
    quoteChecklist: commonQuoteChecks,
  },
  "how-do-i-know-if-i-need-a-new-roof": {
    updated: "5 September 2026",
    readMinutes: 6,
    keyTakeaway: "One leak does not automatically justify a new roof. Replacement becomes rational when failure is widespread or access-heavy repairs keep consuming money without restoring dependable service.",
    sections: [
      { heading: "Evidence that supports repair", bullets: ["One localised defect with otherwise sound coverings", "A clear failed flashing, slipped tile or isolated valley detail", "Underlay and battens remain serviceable around the affected area", "A repair can be completed without disturbing large areas of brittle material"] },
      { heading: "Evidence that supports replacement", bullets: ["Brittle, delaminating or extensively damaged coverings", "Failed underlay across several areas", "Repeated leaks appearing in different locations", "Widespread batten or timber decay", "Multiple roof junctions require renewal at the same time", "Cumulative repair and scaffold costs are approaching the cost of renewal"] },
      { heading: "Ask for both options where both are viable", paragraphs: ["A useful inspection should explain the probable remaining life, the limits of a repair and which defects a reroof would address. If a contractor recommends replacement, ask for photographs and a written system-wide reason—not age alone."] },
      { heading: "The false economy test", paragraphs: ["Add the likely repair, access and internal damage costs over the next three to five years. Compare that figure with the net cost of replacement after allowing for the longer service period and improved documentation. Replacement is not automatically better, but repeated scaffold-dependent patching is rarely cheap."] },
    ],
    quoteChecklist: commonQuoteChecks,
  },
  "what-should-a-new-roof-quotation-include": {
    updated: "5 September 2026",
    readMinutes: 7,
    keyTakeaway: "A roofing quotation is a specification and risk-allocation document. If it only says 'replace roof', the price cannot be judged properly.",
    sections: [
      { heading: "The physical work", bullets: ["Areas to be stripped and whether old layers are removed", "Exact tiles or slates, colour and manufacturer", "Underlay, graded battens, headlap and fixing method", "Ridge, hip, verge, eaves and ventilation details", "Lead code and treatment of chimneys, valleys and abutments", "Insulation build-up and treatment of thermal bridges"] },
      { heading: "Access, protection and waste", bullets: ["Scaffold elevations, edge protection and any pavement licence", "Protection for windows, paving, conservatories and neighbours", "Controlled stripping and temporary weathering", "Waste carrier responsibility and disposal", "Daily clean-down and final gutter/window clean where agreed"] },
      { heading: "Commercial protections", bullets: ["Price excluding VAT, VAT amount and total payable", "Start assumptions and estimated programme", "Payment milestones linked to progress", "Rates or allowances for hidden timber repairs", "Written approval process for variations", "Guarantees, Building Control route and completion pack"] },
      { heading: "Red flags", bullets: ["Large cash deposit", "No company name or address", "No product names", "No scaffold or waste detail", "Unlimited hidden-work extras", "Guarantee promised verbally", "Pressure to accept immediately"] },
    ],
    quoteChecklist: commonQuoteChecks,
  },
  "why-are-roofing-quotes-so-different": {
    updated: "5 September 2026",
    readMinutes: 5,
    keyTakeaway: "Do not compare totals until the scopes have been normalised. A low quotation created by omissions is an unpriced liability, not a saving.",
    sections: [
      { heading: "Normal reasons for a genuine difference", bullets: ["Different covering products and guarantees", "Different scaffold and protection requirements", "Full renewal versus an overlay or partial repair", "Different insulation and ventilation solutions", "Allowance for leadwork, timber and access", "Company overhead, competence and aftercare"] },
      { heading: "Create a like-for-like comparison", paragraphs: ["Put the quotations side by side and mark every inclusion, exclusion and provisional allowance. Ask each contractor to price the same missing items before deciding. The best value is the lowest credible whole-job cost, not the lowest first number."] },
      { heading: "Questions that expose risk quickly", bullets: ["Which named materials will be installed?", "Is scaffold and VAT included?", "Who handles Building Regulations compliance?", "How are hidden defects approved and charged?", "Who issues the guarantee and what exactly does it cover?", "What is excluded from making the roof complete?"] },
    ],
    quoteChecklist: commonQuoteChecks,
  },
  "why-does-my-roof-leak-around-the-chimney": {
    updated: "5 September 2026",
    readMinutes: 6,
    keyTakeaway: "A stain beside a chimney does not prove the lead flashing is at fault. Masonry, flaunching, pots, underlay and nearby coverings must be assessed together.",
    sections: [
      { heading: "Common entry routes", bullets: ["Split, undersized or poorly chased lead flashings", "Open mortar joints or saturated masonry", "Cracked flaunching around chimney pots", "Defective soakers hidden below slates or tiles", "Failed back gutter on the upslope side", "Water travelling from a higher defect along underlay or timber"] },
      { heading: "Clues worth recording", bullets: ["Which chimney face takes the weather", "Whether leakage happens only in wind-driven rain", "Exact position of loft dampness versus the ceiling stain", "Condition of unused flues and ventilation", "Any recent pointing, coating or roof repair"] },
      { heading: "Repair options", paragraphs: ["The right scope might be a local lead repair, new step flashings and soakers, repointing, rebuilding defective flaunching or a coordinated chimney overhaul. Smearing sealant over the visible joint rarely fixes movement or hidden detailing."] },
      { heading: "When it is urgent", bullets: ["Loose masonry or pots", "Water close to electrical fittings", "Saturated ceiling or insulation", "Rapidly spreading damp after each storm"] },
    ],
    quoteChecklist: ["Photos of every chimney face and the upslope back gutter", "Separate pricing for leadwork and masonry", "Lead code, bay lengths and fixing method", "Treatment of hidden soakers and underlay", "Scaffold and debris protection"],
  },
  "which-flat-roof-system-is-best": {
    updated: "5 September 2026",
    readMinutes: 7,
    keyTakeaway: "There is no best membrane in isolation. The best flat roof is the compatible build-up that deals with structure, vapour, insulation, falls, drainage and details.",
    sections: [
      { heading: "Compare complete systems", bullets: ["Condition and type of structural deck", "Vapour-control layer and condensation design", "Insulation type, thickness and continuity", "Designed falls and drainage outlets", "Membrane compatibility at kerbs and penetrations", "Fire and wind-uplift requirements", "Installer competence and meaningful guarantee"] },
      { heading: "Resitrix SKW", paragraphs: ["Resitrix SKW is a reinforced EPDM membrane with a self-adhesive underside and hot-air-welded seams. It is suited to many detailed domestic and commercial roofs when installed as a compatible system. J&L Welch provides a 20-year guarantee on its agreed Resitrix SKW installations."] },
      { heading: "Modern reinforced felt", paragraphs: ["A properly specified multi-layer bituminous system remains a credible and cost-conscious option. It should not be confused with lightweight shed felt. J&L Welch provides a 10-year guarantee on its agreed felt flat-roof installations."] },
      { heading: "Where overlays go wrong", bullets: ["Wet insulation is trapped", "A weak deck is concealed", "Door and outlet heights become unworkable", "Existing falls are not corrected", "The new membrane is chemically or mechanically incompatible"] },
    ],
    quoteChecklist: ["Full layer-by-layer roof build-up", "Deck replacement allowance", "Falls, outlets and overflow provision", "Perimeter, kerb and penetration details", "Manufacturer preparation and installation requirements", "Guarantee issuer and duration"],
    sources: [{ label: "CARLISLE / RESITRIX technical support", href: "https://www.resitrix.com/" }],
  },
  "do-i-need-building-regulations-for-a-new-roof": {
    updated: "5 September 2026",
    readMinutes: 6,
    keyTakeaway: "Major roof renovation often engages Building Regulations, particularly when a thermal element is renovated. Confirm the compliance route before work begins.",
    sections: [
      { heading: "Why it matters", paragraphs: ["Roof renewal can affect structure, fire performance, insulation, ventilation and energy efficiency. The required route depends on the property and scope, so it should be established before materials are ordered."] },
      { heading: "What the contractor should clarify", bullets: ["Whether the work is notifiable", "Who submits or self-certifies the work", "Target thermal performance and complete insulation build-up", "How ventilation and condensation risk are addressed", "What happens where full upgrading is technically or economically constrained", "Which certificate the homeowner receives at completion"] },
      { heading: "Documents to retain", bullets: ["Accepted quotation and specification", "Building Control or competent-person certificate", "Product information", "Photographs of concealed insulation and ventilation details", "Guarantees and final paid invoice"] },
    ],
    quoteChecklist: commonQuoteChecks,
    sources: [
      { label: "GOV.UK Approved Document L", href: "https://www.gov.uk/government/publications/conservation-of-fuel-and-power-approved-document-l" },
      { label: "CompetentRoofer", href: "https://www.competentroofer.co.uk/" },
    ],
  },
  "what-should-i-do-after-storm-damage-to-my-roof": {
    updated: "5 September 2026",
    readMinutes: 5,
    keyTakeaway: "Protect people first, prevent avoidable further damage where safe, and preserve evidence before permanent work changes the scene.",
    sections: [
      { heading: "First 30 minutes", bullets: ["Keep people and vehicles away from loose tiles, masonry and gutters", "Do not climb onto the roof", "Stay clear of bulging ceilings", "Isolate affected electrics only if it is safe", "Move possessions and use containers without standing below unstable finishes"] },
      { heading: "Build an evidence file", bullets: ["Photograph the exterior from ground level", "Record internal water paths and damaged contents", "Keep the date, approximate time and weather conditions", "Save emergency invoices and messages", "Retain the insurer's claim reference and instructions"] },
      { heading: "Temporary versus permanent work", paragraphs: ["Emergency work should make the property reasonably safe and limit further damage. Unless immediate safety requires more, avoid committing to irreversible replacement before the insurer has given instructions. Keep temporary work clearly itemised."] },
      { heading: "What insurance may not cover", paragraphs: ["Home insurance is not a maintenance contract. Policies commonly distinguish sudden storm damage from wear, deterioration and poor maintenance; the individual policy and evidence control the outcome."] },
    ],
    quoteChecklist: ["Cause and extent described factually", "Before-and-after photographs", "Temporary work separated from permanent repair", "Itemised materials and labour", "Any pre-existing deterioration recorded honestly"],
    sources: [{ label: "Association of British Insurers: storms", href: "https://www.abi.org.uk/policy-and-guidance/general-insurance/storms" }, { label: "Association of British Insurers: home insurance", href: "https://www.abi.org.uk/policy-and-guidance/general-insurance/personal-insurance/home-insurance" }],
  },
};

export const featuredGuideBySlug = (slug: string) => featuredGuides[slug];
