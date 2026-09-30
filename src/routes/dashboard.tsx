import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CircleHelp, Clock3, Cpu, Database, FileSearch, FileText, Plus, ShieldCheck, TriangleAlert, Zap } from "lucide-react";

import { AppShell } from "../components/app/app-shell";
import { recommendations } from "../components/app/data";
import { QuickAction, RecommendationTable, SummaryCard } from "../components/app/widgets";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | AI Procurement Assistant" },
      { name: "description", content: "Overview of recommendations, standards database, pending reviews and quick actions for procurement officers." },
      { property: "og:title", content: "AI Procurement Assistant Dashboard" },
      { property: "og:description", content: "Evidence-backed Indian Standards recommendations for public procurement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good Morning," : h < 17 ? "Good Afternoon," : "Good Evening,";
}

function Dashboard() {
  return (
    <AppShell>
      <section className="welcome-banner">
        <div>
          <p className="welcome-hi" suppressHydrationWarning>{greeting()}</p>
          <h1>Procurement Officer</h1>
          <p>Find the right Indian Standards for your procurement needs<br />with AI-powered recommendations.</p>
        </div>
        <div className="banner-art" aria-hidden="true">
          <span className="art-doc"><FileText /><i /><i /><i /></span>
          <span className="art-shield"><ShieldCheck /></span>
          <span className="art-chip"><Cpu /></span>
        </div>
      </section>

      <section className="summary-grid">
        <SummaryCard to="/new-recommendation" icon={FileSearch} title="New Recommendation" text="Find applicable Indian Standards" tone="blue" />
        <SummaryCard to="/history" icon={Clock3} title="Previous Recommendations" text="12 recommendations" tone="violet" />
        <SummaryCard to="/standards" icon={Database} title="Standards Database" text="1,250+ standards" tone="green" />
        <SummaryCard to="/pending-review" icon={TriangleAlert} title="Pending Review" text="3 recommendations" tone="orange" />
      </section>

      <Link to="/new-recommendation" className="start-bar"><Plus /> Start New Recommendation <ArrowRight /></Link>

      <section className="dash-lower">
        <RecommendationTable rows={recommendations} />
        <section className="panel-card">
          <div className="panel-head"><h2><Zap /> Quick Actions</h2></div>
          <div className="quick-list">
            <QuickAction to="/standards" icon={BookOpen} title="Browse Standards Library" text="Search and explore Indian Standards" tone="blue" />
            <QuickAction to="/history" icon={Clock3} title="View Recommendation History" text="Access your past searches and results" tone="violet" />
            <QuickAction to="/pending-review" icon={TriangleAlert} title="Check Pending Reviews" text="Review recommendations awaiting approval" tone="orange" />
            <QuickAction to="/help" icon={CircleHelp} title="Get Help & Support" text="FAQs, guides and user support" tone="green" />
          </div>
        </section>
      </section>
    </AppShell>
  );
}
