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
};

export const recommendedOrder = ["is-16068-2024", "is-1180-2020", "is-14220-2021", "is-10322-2020"];
export const DEFAULT_STANDARD = "is-16068-2024";
