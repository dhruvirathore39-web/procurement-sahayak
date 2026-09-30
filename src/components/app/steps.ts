import { FileStack, FileText, Link2, Network, Search, ShieldCheck, Target } from "lucide-react";

export const analysisSteps = [
  { icon: FileText, title: "Extracting technical specifications", text: "Identifying key parameters from your document..." },
  { icon: Target, title: "Understanding product category", text: "Classifying the product and use case..." },
  { icon: Network, title: "Generating semantic embeddings", text: "Creating vector representations..." },
  { icon: Search, title: "Searching standards database", text: "Finding relevant Indian Standards..." },
  { icon: Link2, title: "Checking related standards", text: "Identifying allied and normative standards..." },
  { icon: FileStack, title: "Checking amendments & versions", text: "Verifying latest versions and amendments..." },
  { icon: ShieldCheck, title: "Checking certification requirements", text: "Verifying QCO and safety certifications..." },
];
