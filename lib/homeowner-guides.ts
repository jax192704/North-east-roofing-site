export type HomeownerGuide = {
  slug: string;
  title: string;
  description: string;
  stage: string;
  takeaway: string;
  topicSlugs: string[];
  sections: { id: string; title: string; paragraphs: string[]; checks?: string[] }[];
  questionSlugs: string[];
  sources: { label: string; href: string }[];
};

export const homeownerGuides: HomeownerGuide[] = [
  {
    slug: "prepare-for-a-roof-survey",
    title: "Prepare for a roof survey: what to photograph, record and ask",
    description: "A practical survey checklist for North East homeowners: record leak patterns, prepare safe access and ask for evidence before agreeing roof work.",
    stage: "Before the visit",
    takeaway: "A good inspection starts with the history of the problem. Useful evidence can prevent a repeat visit or a repair aimed at the wrong defect.",
    topicSlugs: ["leaks-and-repairs", "maintenance-and-home-buying", "storms-insurance-and-emergencies"],
    sections: [
      { id: "record-the-pattern", title: "1. Record what happens, not what you think caused it", paragraphs: ["Write down when the problem started and whether it appears during steady rain, wind-driven rain, cold mornings or after using the bathroom. Mark the room and ceiling area affected. A stain beneath a chimney is evidence of where water appeared, not proof that the chimney is the source.", "For an intermittent leak, keep a simple dated log. Note wind direction if known, how long the rain lasted and whether the damp patch grew. Tell the roofer about previous repairs, including ones that worked temporarily."], checks: ["Date first noticed and frequency", "Photographs before decorating or cleaning the stain", "Previous invoices, guarantees and repair descriptions", "Any recent insulation, extraction or solar-panel work"] },
      { id: "safe-photographs", title: "2. Take useful photographs from a safe position", paragraphs: ["Take a wide view to show the roof and a closer view of the visible concern from ground level. Indoors, show both the affected area and enough of the room to locate it. Photograph loft conditions only where access and a proper walkway are already safe; ceiling plasterboard is not a walking surface.", "Do not climb a ladder or walk on the roof to obtain a better photograph. Do not disturb suspect asbestos, electrical fittings or unstable ceilings. Keep people away from falling material or a bulging ceiling and seek urgent help where necessary."], checks: ["A whole-building view", "A close view of the stain with surrounding features", "An image showing changes during or after rain", "No unnecessary faces, documents or neighbouring interiors"] },
      { id: "prepare-access", title: "3. Explain access restrictions before the appointment", paragraphs: ["Tell the office about locked side gates, conservatories, extensions, shared drives, parking restrictions and any vulnerable occupants. Mention a loft hatch in a cupboard or a roof hidden behind a higher building. The roofer can then explain what can be inspected at the first visit and whether specialist access is needed.", "A drone view can show coverings and junctions but cannot prove that hidden insulation is dry or timber is sound. Ask what remains uninspected and whether opening-up or scaffold access is needed before a firm specification is possible."] },
      { id: "ask-for-evidence", title: "4. Leave the visit with a clear next step", paragraphs: ["Ask for the likely cause, supporting photographs, limits of the inspection and whether repair and replacement are both viable. Separate confirmed defects from possible hidden work. If further investigation is chargeable, agree its scope and price before it takes place."], checks: ["What is confirmed, and what remains uncertain?", "What will the proposed repair actually address?", "Is any temporary work needed while a quotation is prepared?", "What access, further investigation or documents are still required?"] },
    ],
    questionSlugs: ["how-do-i-find-where-a-roof-leak-is-coming-from", "can-a-roof-leak-without-missing-tiles", "what-roof-problems-should-i-look-for-when-buying-a-house"],
    sources: [{ label: "HSE: roof-work safety", href: "https://www.hse.gov.uk/construction/safetytopics/roofwork.htm" }],
  },
  {
    slug: "compare-roofing-quotes-checklist",
    title: "Compare roofing quotes: a like-for-like homeowner checklist",
    description: "Compare roofing quotations by scope, VAT, scaffold, materials, hidden-work allowances and handover documents before choosing a contractor.",
    stage: "Before you appoint",
    takeaway: "The lowest total is only meaningful when you know that each contractor has priced the same work, exclusions and responsibilities.",
    topicSlugs: ["costs-and-quotes", "new-roofs", "flat-roofs", "guarantees-and-building-control"],
    sections: [
      { id: "same-scope", title: "1. Put every contractor on the same scope", paragraphs: ["Start a comparison with one column per contractor. Copy the exact wording rather than interpreting a blank as included. Mark each item as included, excluded, an allowance or awaiting confirmation. Send the unresolved items back for written clarification.", "A partial repair, an overlay and a complete strip-and-renew are different proposals. Compare those options separately before comparing the contractors offering each option."], checks: ["Roof areas included, including porches and extensions", "Strip-off, retained layers and disposal", "Named covering, underlay, battens and fixings", "Insulation, ventilation, ridges, verges and eaves", "Chimneys, valleys, flashings, rooflights and solar coordination"] },
      { id: "whole-price", title: "2. Compare the amount you will actually pay", paragraphs: ["Record the quoted total, VAT treatment, fixed-price inclusions and provisional allowances. Check scaffold, protection, delivery, waste removal and any access licences. Do not compare a VAT-inclusive figure with one that excludes VAT.", "For example, if Quote A is £8,000 including VAT and Quote B is £7,000 plus £1,400 VAT, Quote B is £8,400 before any exclusions. This is an arithmetic illustration, not a roof price guide or a statement of the VAT treatment of your work."], checks: ["Total payable and VAT stated clearly", "Scaffold elevations and hire period", "Protection and temporary weatherproofing", "Hidden timber or deck allowance and approval process", "Any work the homeowner must arrange separately"] },
      { id: "variations", title: "3. Control unknown work before the roof is opened", paragraphs: ["A sensible quotation acknowledges what cannot be seen. Ask what evidence triggers a variation, how labour and materials will be priced and who approves it. Avoid an unlimited commitment to replace anything the contractor later considers necessary.", "Ask for photographs and a written price before additional non-emergency work proceeds. Also agree how the roof will be kept safe while a decision is made and what happens if weather delays the programme."] },
      { id: "decision", title: "4. Judge the complete proposal", paragraphs: ["Check who contracts with you, what insurance and relevant registration can be verified, and who is responsible for compliance and the guarantee. The shortest programme or longest guarantee is not automatically the best offer: the written scope, exclusions and responsible organisation matter.", "Choose the proposal that explains the problem, provides a credible solution and makes the financial responsibilities clear. If a material question remains unanswered, resolve it before accepting."], checks: ["Contracting business and contact details", "Programme, payment terms and exclusions", "Building Regulations route where applicable", "Workmanship versus manufacturer or insurance-backed cover", "Completion documents and snagging process"] },
    ],
    questionSlugs: ["what-should-a-new-roof-quotation-include", "why-are-roofing-quotes-so-different", "what-is-a-provisional-sum-in-a-roofing-quote", "how-do-roofing-variations-work"],
    sources: [{ label: "GOV.UK: Building Regulations approval", href: "https://www.gov.uk/building-regulations-approval" }],
  },
  {
    slug: "roof-maintenance-calendar",
    title: "A seasonal roof-maintenance calendar for North East homes",
    description: "Plan safe ground-level roof checks through the year, record changes after storms and know when a professional inspection is needed.",
    stage: "Looking after your roof",
    takeaway: "Use seasonal checks to notice change early. This is a ground-level observation routine, not a DIY roof-access or cleaning schedule.",
    topicSlugs: ["maintenance-and-home-buying", "chimneys-leadwork-and-roofline", "insulation-and-ventilation", "storms-insurance-and-emergencies"],
    sections: [
      { id: "spring", title: "Spring: compare the roof with its pre-winter condition", paragraphs: ["From a safe position, look for slipped coverings, disturbed ridge or verge details, loose guttering and new staining on external walls. Compare photographs with earlier ones so that normal weathering is not confused with sudden deterioration.", "Check internal ceiling stains and accessible loft areas after rain. If a previously dry space is becoming damp, record the pattern and arrange diagnosis rather than waiting for extensive internal damage."], checks: ["New debris on the ground", "Changed roof lines or visibly displaced coverings", "Gutter joints or downpipes leaking during rain", "Recurring damp after a previous repair"] },
      { id: "summer", title: "Summer: plan access-heavy repairs and document completed work", paragraphs: ["Use planned work to coordinate access where practical. If chimney, roofline and covering repairs all need scaffold, ask whether they can sensibly be combined. Combining access is worthwhile only when the work is genuinely needed.", "Check the maintenance instructions for the installed roof system. Do not pressure-wash, coat or apply chemicals simply to improve appearance without checking suitability. Keep a record of repairs, invoices and photographs for future surveys and guarantee enquiries."] },
      { id: "autumn", title: "Autumn: check drainage before persistent wet weather", paragraphs: ["Watch gutters and downpipes during ordinary rain from ground level. Overflow can be caused by debris, alignment, outlet restrictions or inadequate capacity; replacing a joint will not solve every cause. Arrange safe professional cleaning or investigation where access is required.", "For flat roofs, observe accessible drainage without stepping onto the membrane. Record persistent standing water and whether it clears after rain. Do not improvise holes or new outlets."], checks: ["Overflow and water tracking down walls", "Trees depositing leaves near outlets", "Loose gutters or downpipe brackets", "Changes in ponding or wet internal finishes"] },
      { id: "winter", title: "Winter and storms: prioritise safety and fresh evidence", paragraphs: ["Stay away from loose materials and do not inspect the roof during strong winds. When safe, record new damage from ground level. Active water near electrics, unstable masonry or a bulging ceiling needs urgent attention.", "A wet loft in cold weather may involve condensation, rain entry or both. Record when moisture appears and tell the roofer about insulation or ventilation changes. Do not assume every damp patch needs a new roof."], checks: ["Keep dated before-and-after photographs", "Log leak timing and weather", "Arrange inspection after significant damage", "Follow the roof system's actual maintenance and guarantee requirements"] },
    ],
    questionSlugs: ["how-often-should-a-roof-be-inspected", "why-do-my-gutters-overflow-in-heavy-rain", "why-is-there-condensation-in-my-loft", "what-should-i-do-after-storm-damage-to-my-roof"],
    sources: [{ label: "HSE: roof-work safety", href: "https://www.hse.gov.uk/construction/safetytopics/roofwork.htm" }],
  },
  {
    slug: "new-roof-handover-checklist",
    title: "New-roof handover: photographs, snagging and documents to keep",
    description: "A practical completion checklist: compare the finished roof with the agreed scope, record outstanding items and keep guarantees and compliance documents.",
    stage: "When work finishes",
    takeaway: "A useful handover records what was installed, what is outstanding and who is responsible for the next action. A guarantee alone is not the whole completion pack.",
    topicSlugs: ["new-roofs", "flat-roofs", "guarantees-and-building-control", "costs-and-quotes"],
    sections: [
      { id: "scope", title: "1. Check against the accepted quotation", paragraphs: ["Use the agreed specification and approved variations as the checklist. Ask the contractor to explain any change of material or detail and where it was agreed. Compare photographs of concealed work with the specified insulation, ventilation, deck or underlay where those items were part of the job.", "The homeowner should not climb onto the roof to sign it off. Ask for photographs and a safe explanation of the work. A specialist independent inspection may be appropriate if there is a significant unresolved concern."], checks: ["Named covering and colour", "Leadwork, chimneys, rooflights and perimeter details", "Insulation and ventilation included in the contract", "Gutters, drainage and agreed making-good", "Approved variations matched to the final invoice"] },
      { id: "snagging", title: "2. Make outstanding items specific", paragraphs: ["Create one dated list with a photograph, location, description, responsible person and proposed completion date for each item. Distinguish unfinished contract work from new work you would like added. Keep discussions in writing so everyone is using the same list.", "Ask how scaffold removal and any follow-up inspection will be coordinated. Follow the agreed contract and obtain advice about a payment dispute rather than assuming a checklist changes payment terms. Report any active leak or safety concern promptly."] },
      { id: "documents", title: "3. Keep a property-specific completion pack", paragraphs: ["Not every document applies to every repair. Agree the handover list before work and record when any later certificate is expected. Check the property address, contractor, dates and scope on each document.", "A Building Regulations completion document, workmanship guarantee, product warranty and insurance-backed policy serve different purposes. Ask which applies and who issues it; one should not be described as a substitute for another."], checks: ["Accepted quotation and all agreed variations", "Final invoice and payment record", "Before, during and completion photographs", "Written workmanship guarantee and claims contact", "Manufacturer or insurance-backed documents where applicable", "Compliance certificate where required", "Maintenance instructions and relevant product details"] },
      { id: "aftercare", title: "4. Make future checks straightforward", paragraphs: ["Store the pack in a folder named for the property and the date of the work. Keep original photographs where possible. Add later inspections or repairs to the same record rather than relying on messages spread across different phones.", "Read the maintenance and transfer conditions of the actual guarantee. If you sell the home, provide the documents and explain any transfer process or deadline that the issuing organisation requires. Website descriptions do not override the written terms."] },
    ],
    questionSlugs: ["what-documents-should-i-get-after-a-new-roof", "what-does-a-roof-workmanship-guarantee-cover", "does-a-roof-guarantee-transfer-to-a-new-owner", "what-is-an-insurance-backed-guarantee"],
    sources: [{ label: "GOV.UK: Building Regulations approval", href: "https://www.gov.uk/building-regulations-approval" }],
  },
];

export const homeownerGuideBySlug = (slug: string) => homeownerGuides.find(guide => guide.slug === slug);
export const guidesForTopic = (slug: string) => homeownerGuides.filter(guide => guide.topicSlugs.includes(slug));
