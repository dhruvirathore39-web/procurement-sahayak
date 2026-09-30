import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, FileCheck2, House } from "lucide-react";
import { useEffect, useState } from "react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";
import { recommendedOrder, standards } from "../components/app/standards";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Recommendation Results | AI Procurement Assistant" },
      { name: "description", content: "Recommended Indian Standards generated for your procurement requirement." },
      { property: "og:title", content: "Recommendation Results | AI Procurement Assistant" },
      { property: "og:description", content: "Evidence-backed Indian Standards matched to your procurement requirement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Results,
});

type Req = { product: string; specs: string; language: string; fileName: string };

function Results() {
  const [req, setReq] = useState<Req | null>(null);
  useEffect(() => {
    try { setReq(JSON.parse(sessionStorage.getItem("procurement-request") ?? "null")); } catch { setReq(null); }
  }, []);
  return (
    <AppShell>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <House /><ChevronRight /><Link to="/new-recommendation">New Recommendation</Link><ChevronRight /><span>Recommendation Results</span>
      </nav>
      <ScreenPlaceholder title="Recommendation Results" description={req ? `Recommended standards for ${req.product}` : "Sample recommended standards (demo data)."} icon={FileCheck2}>
        {req ? (
          <dl className="detail-grid">
            <div><dt>Product / Equipment</dt><dd>{req.product}</dd></div>
            <div><dt>Language</dt><dd>{req.language}</dd></div>
            <div><dt>Uploaded document</dt><dd>{req.fileName}</dd></div>
          </dl>
        ) : null}
        <div className="result-list">
          {recommendedOrder.map((id) => {
            const s = standards[id]!;
            return (
              <div className="result-row" key={id}>
                <div><strong>{s.number}</strong><small>{s.title}</small></div>
                <span className={`tag tag-${s.relation.toLowerCase()}`}>{s.relation}</span>
                <span className="match">{s.match}%</span>
                <Link to="/standard/$id" params={{ id }} className="view-link">View Details <ArrowRight /></Link>
              </div>
            );
          })}
        </div>
      </ScreenPlaceholder>
    </AppShell>
  );
}
