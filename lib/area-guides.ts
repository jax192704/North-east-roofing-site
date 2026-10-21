export type AreaGuide = {
  intro: string;
  housing: string;
  localFactors: string[];
  questionSlugs: string[];
  projectNote?: { title: string; detail: string };
};

export const areaGuides: Record<string, AreaGuide> = {
  durham: {
    intro: "Durham combines older terraces and stone properties with post-war estates, modern developments and rural homes. That mix means the right repair can range from a local chimney detail to a coordinated reroof with insulation and ventilation upgrades.",
    housing: "Around Durham city and nearby villages, access, shared roofs, chimney junctions and differing roof ages often matter as much as the covering itself. Rural and elevated properties can also be more exposed to wind-driven rain.",
    localFactors: ["Older slate and tiled terraces with shared junctions", "Chimneys, valleys and lead abutments", "Restricted access around city and terraced properties", "Wind exposure on rural and elevated sites", "Loft condensation after insulation changes"],
    questionSlugs: ["how-much-does-a-new-roof-cost-in-the-north-east", "how-do-i-know-if-i-need-a-new-roof", "why-does-my-roof-leak-around-the-chimney", "what-should-a-new-roof-quotation-include", "why-is-my-roof-leaking-only-when-it-rains-sideways", "do-i-need-building-regulations-for-a-new-roof"],
    projectNote: { title: "Recent work around County Durham", detail: "J&L Welch project experience includes new tiled roofs, slate work, flat roofs and full fascia, soffit and gutter renewals across Durham communities including Thornley, Sacriston, Bowburn, Newton Hall and Coxhoe." },
  },
  newcastle: {
    intro: "Newcastle roofing ranges from dense terraces and period homes to large detached properties and modern extensions. Scaffold access, neighbouring roofs, conservation-sensitive finishes and complex lead details can materially affect both specification and cost.",
    housing: "Areas such as Jesmond and Gosforth contain substantial period roofs where the finish, junctions and existing structure need to be treated as one system. Heaton and other terraced areas can involve party-wall, shared-chimney and rear-access constraints.",
    localFactors: ["Period slate and plain-tile roofs", "Dormers, valleys and multiple chimney details", "Rear-access and scaffold constraints", "Shared roof and party-wall interfaces", "Appearance and material matching on prominent streets"],
    questionSlugs: ["natural-slate-or-man-made-slate", "why-does-my-dormer-roof-keep-leaking", "who-is-responsible-for-a-leak-on-a-shared-roof", "why-does-my-roof-leak-around-the-chimney", "what-should-a-new-roof-quotation-include", "how-long-does-a-new-roof-take"],
    projectNote: { title: "Jesmond reroofing experience", detail: "A recent J&L Welch Jesmond project used Bute 3 Duo plain tiles with a TLX Gold roof build-up. Complex period properties need product selection, thermal design and detailing agreed before stripping begins." },
  },
  sunderland: {
    intro: "Sunderland properties can face strong coastal weather as well as the normal risks found on terraces, semis and flat-roof additions. Wind-driven rain and secure fixing at edges, ridges and verges deserve particular attention.",
    housing: "The city and surrounding communities include slate terraces, concrete-tiled estates, bay roofs and extensions. Coastal exposure does not make every leak a storm claim: the roof condition and actual failure still need evidence.",
    localFactors: ["Coastal wind and driving rain", "Slate valleys and chimney junctions", "Ridge, verge and perimeter fixing", "Bay and extension flat roofs", "Salt-laden exposure around seafront areas"],
    questionSlugs: ["why-is-my-roof-leaking-only-when-it-rains-sideways", "what-should-i-do-after-storm-damage-to-my-roof", "will-home-insurance-pay-for-a-new-roof", "is-a-loose-tile-dangerous", "why-do-roof-tiles-crack", "which-flat-roof-system-is-best"],
    projectNote: { title: "Local slate and valley work", detail: "J&L Welch has assessed and priced slate-valley renewal and associated access in Sunderland. Valley work should specify the complete junction rather than treating the visible lining in isolation." },
  },
  gateshead: {
    intro: "Gateshead includes exposed hillsides, older terraces, suburban estates and properties with difficult rear elevations. Roofline and verge defects are common enquiries, but the supporting timber and eaves ventilation must be checked before covering them with new finishes.",
    housing: "Access can change considerably between Low Fell, Whickham, Felling and the wider borough. A quotation should state every scaffold elevation and how conservatories, extensions or sloping ground affect the safe working arrangement.",
    localFactors: ["Hillside wind exposure", "Chimney and party-wall details", "Difficult rear scaffold access", "Ageing timber fascias and gutters", "Dry-verge compatibility and fixing"],
    questionSlugs: ["should-fascias-be-capped-or-replaced", "what-is-dry-verge", "why-do-my-gutters-overflow-in-heavy-rain", "how-much-does-roof-scaffolding-cost", "why-are-roofing-quotes-so-different", "how-do-i-know-if-i-need-a-new-roof"],
    projectNote: { title: "Gateshead roofline project", detail: "Recent J&L Welch work in Gateshead included fascia, soffit and gutter replacement with dry-verge detailing. Sound fixing and the condition behind the visible uPVC are more important than a cosmetic cover-up." },
  },
  "chester-le-street": {
    intro: "Chester-le-Street and its surrounding villages include traditional terraces, post-war estates and newer housing. Chimneys, roofline details, extensions and exposure on higher ground create different repair priorities from one street to the next.",
    housing: "Sacriston, Pelton, Great Lumley and Birtley have varied roof ages and covering types. Repeated local patching should be tested against the condition of the underlay, battens and remaining coverings before more access cost is committed.",
    localFactors: ["Mixed slate and tiled housing", "Chimney and shared-roof junctions", "Older underlay and batten systems", "Flat-roof additions", "Wind exposure in surrounding villages"],
    questionSlugs: ["how-many-times-can-a-roof-be-patched", "can-a-roof-leak-without-missing-tiles", "why-does-my-roof-leak-around-the-chimney", "which-flat-roof-system-is-best", "how-much-does-a-new-roof-cost-in-the-north-east", "what-roof-documents-should-a-house-seller-provide"],
    projectNote: { title: "Work in Sacriston and nearby villages", detail: "J&L Welch works across the Chester-le-Street area, including Sacriston. Local enquiries range from roof repairs and flat roofs to full replacement systems and roofline work." },
  },
  consett: {
    intro: "Consett and the surrounding higher ground are among the more exposed parts of the region. Wind, prolonged wet weather and winter conditions make secure fixing, controlled stripping and realistic programmes particularly important.",
    housing: "Traditional terraces, rural properties and post-war housing around Leadgate, Blackhill, Shotley Bridge and Dipton need different materials and access plans. Weather exposure should inform the fixing specification, not be used as a vague sales claim.",
    localFactors: ["Higher wind and weather exposure", "Winter working limitations", "Older slate and tiled stock", "Rural access and scaffold logistics", "Loose ridges, verges and coverings after storms"],
    questionSlugs: ["can-a-new-roof-be-done-in-winter", "what-should-i-do-after-storm-damage-to-my-roof", "why-is-my-roof-leaking-only-when-it-rains-sideways", "is-a-loose-tile-dangerous", "what-is-dry-ridge", "how-do-i-prove-storm-damage-to-an-insurer"],
    projectNote: { title: "Consett-area experience", detail: "J&L Welch serves Consett, Leadgate, Blackhill, Shotley Bridge and Dipton. Exposed roofs need a product-specific fixing approach and a programme that does not depend on unsafe weather windows." },
  },
};

export const areaGuideBySlug = (slug: string) => areaGuides[slug];
