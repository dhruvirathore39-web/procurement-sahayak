import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bot,
  CheckCircle2,
  ChevronRight,
  FileStack,
  FileText,
  House,
  Lightbulb,
  Link2,
  Loader2,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";

import { AppShell } from "../components/app/app-shell";

export const Route = createFileRoute("/processing")({
  head: () => ({
    meta: [
      { title: "AI Processing | AI Procurement Assistant" },
      { name: "description", content: "The AI is analysing your procurement requirement and finding the most relevant Indian Standards." },
      { property: "og:title", content: "AI Processing | AI Procurement Assistant" },
      { property: "og:description", content: "Live analysis of your requirement against the Indian Standards database." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Processing,
});

const steps = [
  { icon: FileText, title: "Extracting technical specifications", text: "Identifying key parameters from your document..." },
  { icon: Target, title: "Understanding product category", text: "Classifying the product and use case..." },
  { icon: Network, title: "Generating semantic embeddings", text: "Creating vector representations..." },
  { icon: Search, title: "Searching standards database", text: "Finding relevant Indian Standards..." },
  { icon: Link2, title: "Checking related standards", text: "Identifying allied and normative standards..." },
  { icon: FileStack, title: "Checking amendments & versions", text: "Verifying latest versions and amendments..." },
  { icon: ShieldCheck, title: "Checking certification requirements", text: "Verifying QCO and safety certifications..." },
];
// Time (ms) at which each step completes
const finishAt = [1000, 2000, 3000, 4000, 5000, 7000, 8000];

type Req = { product: string; language: string; fileName: string; fileSize?: number };

function formatSize(bytes?: number) {
  if (!bytes) return "2.4 MB";
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function Processing() {
  const navigate = useNavigate();
  const [req, setReq] = useState<Req | null>(null);
  const [done, setDone] = useState(0);

  useEffect(() => {
    let parsed: Req | null = null;
    try { parsed = JSON.parse(sessionStorage.getItem("procurement-request") ?? "null"); } catch { parsed = null; }
    if (!parsed) { navigate({ to: "/new-recommendation", replace: true }); return; }
    setReq(parsed);
    const timers = finishAt.map((t, i) => window.setTimeout(() => setDone(i + 1), t));
    timers.push(window.setTimeout(() => navigate({ to: "/results" }), finishAt[finishAt.length - 1] + 900));
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  const pct = Math.round((done / steps.length) * 100);

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
              <h1>AI Processing</h1>
              <p>Our AI is analyzing your requirement and finding the most relevant Indian Standards.</p>
            </div>
          </div>
          {req && <p className="proc-for">Requirement: <strong>{req.product}</strong> · Language: <strong>{req.language}</strong></p>}

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
            <span className="tone-icon tone-blue"><Sparkles /></span>
            <div><strong>{done === steps.length ? "Analysis complete — preparing results..." : "Analysis in progress..."}</strong><small>This may take a few moments. Please do not close the window.</small></div>
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
          </div>
        </section>

        <div className="proc-side">
          <section className="panel-card">
            <div className="panel-head"><h2><FileText /> Processing Your Document</h2></div>
            <div className="file-chip static">
              <span className="file-icon"><FileText /></span>
              <div><strong>{req?.fileName ?? "—"}</strong><small>{formatSize(req?.fileSize)}</small></div>
            </div>
            <p className="upload-ok"><CheckCircle2 /> Uploaded successfully</p>
            <div className="progress-head"><strong>AI Analysis Progress</strong><span>{pct}%</span></div>
            <div className="progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${pct}%` }} /></div>
            <small className="progress-note">{done}/{steps.length} steps completed</small>
          </section>

          <section className="next-card">
            <span className="tone-icon tone-orange"><Lightbulb /></span>
            <div>
              <strong>What happens next?</strong>
              <p>Once the analysis is complete, we will find the most relevant Indian Standards, check their versions, amendments and certifications, and show you evidence-backed recommendations.</p>
            </div>
          </section>

          <div className="proc-art" aria-hidden="true">
            <span className="pa-leaf l1" /><span className="pa-leaf l2" />
            <span className="pa-doc"><FileText /><i /><i /></span>
            <span className="pa-bot"><Bot /></span>
            <span className="pa-shield"><ShieldCheck /></span>
            <p>Better Standards → Safer Procurement</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
