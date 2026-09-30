import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bot, CheckCircle2, ChevronRight, CircleCheckBig, FileText, House, Lightbulb, Loader2, Network, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { AppShell } from "../components/app/app-shell";
import { analysisSteps as steps } from "../components/app/steps";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Advanced AI Analysis | AI Procurement Assistant" },
      { name: "description", content: "Advanced AI analysis turning your procurement requirement into trusted Indian Standards recommendations." },
      { property: "og:title", content: "Advanced AI Analysis | AI Procurement Assistant" },
      { property: "og:description", content: "Semantic search, evidence-based and compliant standards analysis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Analysis,
});

type Req = { product: string; language: string; fileName: string };

function Analysis() {
  const navigate = useNavigate();
  const [req, setReq] = useState<Req | null>(null);
  const [done, setDone] = useState(5);

  useEffect(() => {
    let parsed: Req | null = null;
    try { parsed = JSON.parse(sessionStorage.getItem("procurement-request") ?? "null"); } catch { parsed = null; }
    if (!parsed) { navigate({ to: "/new-recommendation", replace: true }); return; }
    setReq(parsed);
    const timers = [
      window.setTimeout(() => setDone(6), 2000),
      window.setTimeout(() => setDone(7), 4000),
      window.setTimeout(() => navigate({ to: "/results" }), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <AppShell>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <House /><ChevronRight />
        <Link to="/new-recommendation">New Recommendation</Link><ChevronRight />
        <span>AI Processing</span>
      </nav>

      <div className="newrec-layout">
        <section className="panel-card proc-card">
          <div className="screen-head">
            <span><Bot /></span>
            <div>
              <h1>AI is analyzing your requirement...</h1>
              <p>Our AI is processing your document and finding the most relevant Indian Standards. This may take a few moments.</p>
            </div>
          </div>
          {req && <p className="proc-for">Requirement: <strong>{req.product}</strong> · Document: <strong>{req.fileName}</strong> · Language: <strong>{req.language}</strong></p>}

          <ol className="timeline">
            {steps.map(({ icon: Icon, title, text }, i) => {
              const state = i < done ? "done" : i === done ? "active" : "pending";
              return (
                <li key={title} className={`tl-step ${state}`}>
                  <span className="tl-marker">
                    {state === "done" ? <CheckCircle2 /> : state === "active" ? <Loader2 className="spin" /> : <i />}
                  </span>
                  <span className="tl-icon"><Icon /></span>
                  <div className="tl-copy"><strong>{title}</strong><small>{text}</small></div>
                  <span className={`tl-status ${state}`}>{state === "done" ? "Completed" : state === "active" ? "In Progress" : "Pending"}</span>
                </li>
              );
            })}
          </ol>

          <div className="proc-banner">
            <span className="tone-icon tone-orange"><Lightbulb /></span>
            <div><strong>{done === steps.length ? "Analysis complete — opening results..." : "Analysis in progress..."}</strong><small>This may take a few moments. Please do not close the window.</small></div>
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
          </div>
        </section>

        <aside className="insight-panel">
          <div className="proc-art insight-art" aria-hidden="true">
            <span className="pa-leaf l1" /><span className="pa-leaf l2" />
            <span className="pa-doc"><FileText /><i /><i /></span>
            <span className="pa-bot"><Bot /></span>
            <span className="pa-shield"><ShieldCheck /></span>
          </div>
          <h2>Turning your requirements<br />into trusted standards</h2>
          <p className="insight-sub">Advanced AI. Verified Standards. Better Decisions.</p>
          <ul className="capabilities">
            <li><span className="tone-icon tone-blue"><Network /></span><div><strong>Semantic Search</strong><small>Finds the most relevant standards using advanced AI</small></div></li>
            <li><span className="tone-icon tone-green"><ShieldCheck /></span><div><strong>Evidence-based</strong><small>Every recommendation comes with verifiable sources</small></div></li>
            <li><span className="tone-icon tone-violet"><CircleCheckBig /></span><div><strong>Accurate &amp; Compliant</strong><small>Checks versions, amendments and certification requirements</small></div></li>
          </ul>
          <div className="insight-foot">
            <p>Smarter Procurement<br />for a Stronger India</p>
            <div className="mini-parliament" aria-hidden="true">
              <div className="sp-flag" /><div className="sp-dome" />
              <div className="sp-body">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
