import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronRight, FileText, House, Lightbulb, Link2, ListTree, Network, X } from "lucide-react";
import { useState } from "react";

import { AppShell } from "../components/app/app-shell";
import { type GraphNode, graphNodes, standards } from "../components/app/standards";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/graph/$id")({
  loader: ({ params }) => {
    const s = standards[params.id];
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Standards Relationship Graph — ${loaderData?.number ?? ""} | AI Procurement Assistant` },
      { name: "description", content: "Visual map of allied, normative, testing and safety standards connected to the primary standard." },
      { property: "og:title", content: "Standards Relationship Graph | AI Procurement Assistant" },
      { property: "og:description", content: "See how recommended Indian Standards are interconnected." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const legend = [
  { kind: "primary", name: "Primary Standard", text: "Main standard being analyzed" },
  { kind: "allied", name: "Allied Standard", text: "Supports / complements the primary standard" },
  { kind: "normative", name: "Normative Standard", text: "Provides reference / additional requirements" },
  { kind: "testing", name: "Testing Standard", text: "Specifies testing methods and validation" },
  { kind: "safety", name: "Safety Standard", text: "Ensures safety and compliance" },
];

function Node({ n, open, onToggle }: { n: GraphNode; open: boolean; onToggle: () => void }) {
  return (
    <div className={`g-slot g-${n.kind}`}>
      <button type="button" className="g-node" onClick={onToggle} aria-expanded={open}>
        <small>{n.label}</small>
        <strong>{n.number}</strong>
        <span>{n.title}</span>
      </button>
      {open && (
        <div className="g-pop" role="dialog" aria-label={n.number}>
          <button type="button" className="g-pop-x" onClick={onToggle} aria-label="Close"><X /></button>
          <strong>{n.number}</strong>
          <p>{n.title}</p>
          <div className="g-pop-row"><span className={`gtag gtag-${n.kind}`}>{n.label}</span><span className="match">{n.match}% Match</span></div>
          <Link to="/standard/$id" params={{ id: n.id }} className="text-link">View Standard Details <ArrowRight /></Link>
        </div>
      )}
    </div>
  );
}

function Connector({ n, dir }: { n: GraphNode; dir: "v" | "h" }) {
  return (
    <div className={`g-conn g-conn-${dir} g-${n.kind}`}>
      <i className="g-line" />
      <em>{n.link}</em>
    </div>
  );
}

function Page() {
  const s = Route.useLoaderData();
  const [openId, setOpenId] = useState<string | null>(null);
  const [top, right, bottom, left] = graphNodes as [GraphNode, GraphNode, GraphNode, GraphNode];
  const toggle = (id: string) => setOpenId((o) => (o === id ? null : id));

  return (
    <AppShell>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <House /><ChevronRight />
        <Link to="/standard/$id" params={{ id: s.id }}>Recommendation Details</Link><ChevronRight />
        <span>Standards Relationship Graph</span>
      </nav>

      <section className="g-intro">
        <span className="g-intro-icon"><Network /></span>
        <div><h1>Standards Relationship Graph</h1><p>View how the recommended standards are interconnected and related.</p></div>
        <aside><Lightbulb /><p>This graph shows the relationship between the primary standard and other relevant Indian Standards based on BIS framework and domain analysis.</p></aside>
      </section>

      <div className="newrec-layout">
        <section className="panel-card g-card">
          <div className="panel-head"><h2><Network /> Standards Ecosystem</h2></div>
          <div className="g-graph">
            <Node n={top} open={openId === top.id} onToggle={() => toggle(top.id)} />
            <Connector n={top} dir="v" />
            <div className="g-mid">
              <Node n={left} open={openId === left.id} onToggle={() => toggle(left.id)} />
              <Connector n={left} dir="h" />
              <div className="g-slot g-primary">
                <div className="g-core">
                  <FileText />
                  <small>PRIMARY<br />STANDARD</small>
                  <strong>IS 16068:2024</strong>
                  <span>Solar Water Pumping Systems – General Requirements</span>
                </div>
              </div>
              <Connector n={right} dir="h" />
              <Node n={right} open={openId === right.id} onToggle={() => toggle(right.id)} />
            </div>
            <Connector n={bottom} dir="v" />
            <Node n={bottom} open={openId === bottom.id} onToggle={() => toggle(bottom.id)} />
          </div>
          <p className="sd-note">Click any standard to see its details. Relationships are sample demo data.</p>
          <div className="g-actions">
            <Button variant="outline" asChild><Link to="/results"><ArrowLeft /> Back to Recommendations</Link></Button>
            <Button variant="government" asChild><Link to="/standard/$id" params={{ id: "is-16068-2024" }}>View Standard Details <ArrowRight /></Link></Button>
          </div>
        </section>

        <aside className="proc-side">
          <section className="panel-card">
            <div className="panel-head"><h2><ListTree /> Related Standards Summary</h2></div>
            <div className="quick-list">
              {graphNodes.map((n) => (
                <Link key={n.id} to="/standard/$id" params={{ id: n.id }} className="related-item">
                  <div><strong>{n.number}</strong><small>{n.short}</small></div>
                  <span className={`gtag gtag-${n.badge === "Primary" ? "primary" : n.kind}`}>{n.badge}</span>
                  <span className="match">{n.match}%</span>
                  <ChevronRight />
                </Link>
              ))}
            </div>
          </section>

          <section className="panel-card">
            <div className="panel-head"><h2>Relationship Legend</h2></div>
            <ul className="g-legend">
              {legend.map((l) => (
                <li key={l.kind}><i className={`g-dot g-${l.kind}`} /><div><strong>{l.name}</strong><small>{l.text}</small></div></li>
              ))}
            </ul>
          </section>

          <section className="g-why">
            <span className="tone-icon tone-blue"><Link2 /></span>
            <div><strong>Why Relationships Matter?</strong><p>Understanding these connections helps in ensuring complete compliance, better quality and risk reduction in procurement decisions.</p></div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
