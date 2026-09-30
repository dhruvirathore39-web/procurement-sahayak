export type Recommendation = {
  id: string;
  date: string;
  product: string;
  standard: string;
  tag: "Primary" | "Allied" | "Normative";
  status: "Completed" | "Under Review";
  match: number;
  title: string;
};

export const recommendations: Recommendation[] = [
  { id: "solar-water-pump", date: "24 Sep 2026", product: "Solar Water Pump (5 HP)", standard: "IS 16068:2024", tag: "Primary", status: "Completed", match: 94, title: "Solar photovoltaic water pumping systems — Specification" },
  { id: "led-street-light", date: "21 Sep 2026", product: "LED Street Light", standard: "IS 10322:2012", tag: "Allied", status: "Completed", match: 87, title: "Luminaires — Particular requirements for road and street lighting" },
  { id: "water-purifier", date: "18 Sep 2026", product: "Water Purifier", standard: "IS 16240:2021", tag: "Normative", status: "Under Review", match: 82, title: "Reverse osmosis based point-of-use water treatment system" },
  { id: "transformer", date: "15 Sep 2026", product: "Transformer", standard: "IS 1180:2020", tag: "Primary", status: "Completed", match: 90, title: "Outdoor type oil immersed distribution transformers" },
];

export const AUTH_KEY = "procurement-auth";
