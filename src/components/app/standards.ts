// Demo / sample standards data for the prototype. Not sourced from a live BIS database.
export type Relation = "Primary" | "Allied" | "Normative" | "Related";

export type Standard = {
  id: string;
  number: string;
  title: string;
  relation: Relation;
  match: number;
  amendment: string;
  amendmentNote: string;
  category: string;
  subCategory: string;
  scope: string;
  applicability: string;
  related: string[];
};

const base = {
  amendment: "Amendment No. 1 (2025)",
  amendmentNote: "Updated testing methods and efficiency criteria.",
  category: "Mechanical / Engineering",
};

export const standards: Record<string, Standard> = {
  "is-16068-2024": {
    ...base,
    id: "is-16068-2024",
    number: "IS 16068:2024",
    title: "Solar Water Pumping Systems – General Requirements",
    relation: "Primary",
    match: 94,
    subCategory: "Solar Energy Systems",
    scope: "This standard specifies the general requirements for solar water pumping systems, including performance, safety, design, testing and inspection.",
    applicability: "Applicable to solar water pumping systems with power ratings relevant to the procurement requirement.",
    related: ["is-14220-2021", "is-10322-2020", "is-1180-2020"],
  },
  "is-14220-2021": {
    ...base,
    id: "is-14220-2021",
    number: "IS 14220:2021",
    title: "Solar Photovoltaic (PV) Modules",
    relation: "Allied",
    match: 87,
    category: "Electrotechnical",
    subCategory: "Solar Energy Systems",
    scope: "This standard specifies general requirements for solar photovoltaic modules, including construction, performance, marking and testing.",
    applicability: "Applicable to PV modules supplied as part of the procured system.",
    related: ["is-16068-2024", "is-10322-2020"],
  },
  "is-10322-2020": {
    ...base,
    id: "is-10322-2020",
    number: "IS 10322:2020",
    title: "Electrical Safety Requirements",
    relation: "Normative",
    match: 82,
    category: "Electrotechnical",
    subCategory: "Electrical Safety",
    scope: "This standard specifies electrical safety requirements for equipment, including insulation, protection and marking.",
    applicability: "Applicable to electrical components of the procured equipment.",
    related: ["is-16068-2024", "is-1180-2020"],
  },
  "is-1180-2020": {
    ...base,
    id: "is-1180-2020",
    number: "IS 1180:2020",
    title: "Transformer Requirements",
    relation: "Related",
    match: 90,
    category: "Electrotechnical",
    subCategory: "Power Distribution",
    scope: "This standard specifies requirements for distribution transformers, including ratings, performance, losses and testing.",
    applicability: "Applicable where transformers form part of the procured installation.",
    related: ["is-16068-2024", "is-10322-2020"],
  },
  "is-15558-2021": {
    ...base,
    id: "is-15558-2021",
    number: "IS 15558:2021",
    title: "Safety Requirements for Solar Systems",
    relation: "Related",
    match: 78,
    category: "Electrotechnical",
    subCategory: "Solar Energy Systems",
    scope: "This standard specifies safety requirements for solar energy systems, covering protection, risk management, installation and marking.",
    applicability: "Applicable to safety aspects of solar systems supplied under the procurement.",
    related: ["is-16068-2024", "is-10322-2020"],
  },
};

export type GraphKind = "allied" | "normative" | "testing" | "safety";
export type GraphNode = { id: string; kind: GraphKind; label: string; number: string; title: string; short: string; badge: string; match: number; link: string };

// Demo relationship dataset for the Standards Relationship Graph (prototype data).
export const graphNodes: GraphNode[] = [
  { id: "is-14220-2021", kind: "allied", label: "Allied Standard", number: "IS 14220:2021", title: "Solar Photovoltaic (PV) Modules", short: "Solar Photovoltaic (PV) Modules", badge: "Allied", match: 87, link: "Provides complementary details" },
  { id: "is-10322-2020", kind: "normative", label: "Normative Standard", number: "IS 10322:2020", title: "LED Street Light (Normative Reference)", short: "LED Street Light", badge: "Normative", match: 82, link: "Provides reference criteria" },
  { id: "is-1180-2020", kind: "testing", label: "Testing Standard", number: "IS 1180:2020", title: "Transformer (Testing Methods)", short: "Transformer", badge: "Primary", match: 90, link: "Specifies testing and validation methods" },
  { id: "is-15558-2021", kind: "safety", label: "Safety Standard", number: "IS 15558:2021", title: "Safety Requirements for Solar Systems", short: "Safety Requirements for Solar Systems", badge: "Safety", match: 78, link: "Ensures safety & risk management" },
];

export const recommendedOrder = ["is-16068-2024", "is-1180-2020", "is-14220-2021", "is-10322-2020"];
export const DEFAULT_STANDARD = "is-16068-2024";
