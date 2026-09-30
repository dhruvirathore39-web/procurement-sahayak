import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  FileSearch,
  FileText,
  FlaskConical,
  History,
  House,
  Info,
  Link2,
  Settings2,
  ShieldCheck,
  Target,
  TriangleAlert,
} from "lucide-react";
import { type ReactNode, useState } from "react";

import { AppShell } from "../components/app/app-shell";
import { type Standard, standards } from "../components/app/standards";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";

export const Route = createFileRoute("/standard/$id")({
  loader: ({ params }) => {
    const s = standards[params.id];
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.number ?? "Standard"} Details | AI Procurement Assistant` },
      { name: "description", content: loaderData ? `${loaderData.number} — ${loaderData.title}: scope, requirements, amendments and related standards.` : "Standard details." },
      { property: "og:title", content: `${loaderData?.number ?? "Standard"} — Standard Details` },
      { property: "og:description", content: loaderData?.title ?? "Indian Standard details" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StandardDetails,
});

const tabs = ["Overview", "Scope & Applicability", "Testing Methods", "References & Source"] as const;
type Tab = (typeof tabs)[number];

function InfoCard({ icon: Icon, title, children, tone = "blue" }: { icon: typeof FileText; title: string; children: ReactNode; tone?: string }) {
  return (
    <section className="sd-card">
      <h3><span className={`tone-icon tone-${tone}`}><Icon /></span>{title}</h3>
      <div className="sd-card-body">{children}</div>
    </section>
  );
}

function DemoNote({ children }: { children: ReactNode }) {
  return <p className="sd-note"><Info /> {children}</p>;
}

function Overview({ s }: { s: Standard }) {
  return (
    <div className="sd-grid">
      <InfoCard icon={FileText} title="Title & Scope">
        <p>{s.scope}</p>
        <p>Applicable to systems used for agricultural, domestic and industrial applications.</p>
      </InfoCard>
      <InfoCard icon={Target} title="Applicability" tone="green"><p>{s.applicability}</p></InfoCard>
      <InfoCard icon={Settings2} title="Key Requirements" tone="violet">
        <ul><li>Performance and efficiency requirements</li><li>Safety and reliability standards</li><li>Design and construction specifications</li><li>Testing and inspection methods</li></ul>
      </InfoCard>
      <InfoCard icon={History} title="Amendments / Updates" tone="orange">
        <p className="amend">{s.amendment}</p>
        <p>{s.amendmentNote}</p>
        <Link to="/amendments/$id" params={{ id: s.id }} className="text-link">View Amendment Details <ArrowRight /></Link>
      </InfoCard>
      <InfoCard icon={Link2} title="Source / Evidence">
        <p><strong>BIS — Bureau of Indian Standards</strong></p>
        <p className="muted">Official Standards Source (reference only — no live connection in this prototype)</p>
        <SourceLink />
      </InfoCard>
    </div>
  );
}

function SourceLink() {
  const [shown, setShown] = useState(false);
  return (
    <>
      <button type="button" className="text-link" onClick={() => setShown((v) => !v)}>View Source <ArrowRight /></button>
      {shown && <DemoNote>Prototype: a live link to the BIS standards portal would open here once connected.</DemoNote>}
    </>
  );
}

function StandardDetails() {
  const s = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("Overview");
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  return (
    <AppShell>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <House /><ChevronRight />
        <Link to="/new-recommendation">New Recommendation</Link><ChevronRight />
        <Link to="/results">Recommendation Results</Link><ChevronRight />
        <span>Standard Details</span>
      </nav>

      <section className="panel-card sd-header">
        <div className="sd-title">
          <span className="sd-icon"><FileText /><BadgeCheck className="sd-badge" /></span>
          <div>
            <p className="sd-number">{s.number}</p>
            <h1>{s.title}</h1>
            <div className="sd-badges">
              <span className={`tag tag-${s.relation.toLowerCase()}`}>{s.relation} Standard</span>
              <span className="status-badge done">{s.match}% Match</span>
            </div>
          </div>
        </div>
        <div className="sd-meta">
          <div><small>Version / Year</small><strong>{s.number}</strong></div>
          <div><small>Latest Amendment</small><strong><TriangleAlert className="warn" /> {s.amendment}</strong></div>
        </div>
      </section>

      <Button variant="outline" size="sm" asChild className="sd-back">
        <Link to="/results"><ArrowLeft /> Back to Recommendations</Link>
      </Button>

      <div className="newrec-layout">
        <div className="sd-main">
          <div className="sd-tabs" role="tablist">
            {tabs.map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>

          {tab === "Overview" && <Overview s={s} />}
          {tab === "Scope & Applicability" && (
            <div className="sd-grid">
              <InfoCard icon={FileText} title="Scope"><p>{s.scope}</p></InfoCard>
              <InfoCard icon={Target} title="Applicability" tone="green"><p>{s.applicability}</p><p>Category: {s.category} · {s.subCategory}</p></InfoCard>
            </div>
          )}
          {tab === "Testing Methods" && (
            <div className="sd-grid">
              <InfoCard icon={FlaskConical} title="Testing Requirements" tone="violet">
                <ul><li>Performance testing</li><li>Efficiency testing</li><li>Safety testing</li><li>Inspection requirements</li></ul>
              </InfoCard>
              <DemoNote>Testing information is shown as prototype/demo data unless connected to an authoritative standards database.</DemoNote>
            </div>
          )}
          {tab === "References & Source" && (
            <div className="sd-grid">
              <InfoCard icon={Link2} title="References">
                <dl className="sd-dl">
                  <dt>Primary Standard</dt><dd>{s.number}</dd>
                  <dt>Related Standards</dt><dd>{s.related.map((r) => standards[r]?.number).join(", ")}</dd>
                  <dt>Normative References</dt><dd>Testing and safety references</dd>
                  <dt>Source</dt><dd>Standards Knowledge Base</dd>
                </dl>
                <SourceLink />
              </InfoCard>
            </div>
          )}

          <div className="proc-banner">
            <span className="tone-icon tone-blue"><ShieldCheck /></span>
            <div><strong>Evidence &amp; Verification Status</strong><small>This recommendation is supported by the procurement requirement and the standards metadata available to the prototype.</small></div>
          </div>
        </div>

        <aside className="proc-side">
          <section className="panel-card">
            <div className="panel-head"><h2><FileSearch /> Standard Summary</h2></div>
            <dl className="sd-dl">
              <dt>IS Number</dt><dd>{s.number}</dd>
              <dt>Title</dt><dd>{s.title}</dd>
              <dt>Category</dt><dd>{s.category}</dd>
              <dt>Sub-category</dt><dd>{s.subCategory}</dd>
              <dt>Status</dt><dd><span className="status-badge done">Current</span></dd>
              <dt>Language</dt><dd>English</dd>
            </dl>
          </section>

          <section className="panel-card">
            <div className="panel-head"><h2><Link2 /> Related Standards</h2><Link to="/graph/$id" params={{ id: s.id }}>View Graph <ArrowRight /></Link></div>
            <div className="quick-list">
              {s.related.map((rid) => {
                const r = standards[rid]!;
                return (
                  <Link key={rid} to="/standard/$id" params={{ id: rid }} className="related-item">
                    <div><strong>{r.number}</strong><small>{r.title}</small></div>
                    <span className={`tag tag-${r.relation.toLowerCase()}`}>{r.relation}</span>
                    <span className="match">{r.match}%</span>
                    <ChevronRight />
                  </Link>
                );
              })}
            </div>
            <DemoNote>Sample relationships (demo data).</DemoNote>
          </section>

          <section className="panel-card">
            <div className="panel-head"><h2><ShieldCheck /> Certification / QCO</h2><span className="status-badge done">Applicable</span></div>
            <p className="sd-text">Relevant certification and quality-control information associated with this standard.</p>
            <Link to="/certification/$id" params={{ id: s.id }} className="text-link">View Details <ArrowRight /></Link>
          </section>

          <button type="button" className="next-card evidence-card" onClick={() => setEvidenceOpen(true)}>
            <span className="tone-icon tone-blue"><FileText /></span>
            <div><strong>Evidence Found in Tender</strong><p>Technical specification matches with the selected standard.</p></div>
            <ChevronRight />
          </button>
        </aside>
      </div>

      <Dialog open={evidenceOpen} onOpenChange={setEvidenceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Evidence Found in Tender</DialogTitle>
            <DialogDescription>How the uploaded document relates to this standard (prototype).</DialogDescription>
          </DialogHeader>
          <dl className="sd-dl">
            <dt>Matched Requirement</dt><dd>Technical requirement from uploaded tender</dd>
            <dt>Matched Standard</dt><dd>{s.number}</dd>
            <dt>Match</dt><dd>{s.match}%</dd>
            <dt>Source</dt><dd>Uploaded procurement document</dd>
          </dl>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
