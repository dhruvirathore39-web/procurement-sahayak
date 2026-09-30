import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import type { ComponentType } from "react";

import { type Recommendation } from "./data";

type Tone = "blue" | "violet" | "green" | "orange";
type Icon = ComponentType<{ className?: string }>;

export function SummaryCard({ to, icon: I, title, text, tone }: { to: string; icon: Icon; title: string; text: string; tone: Tone }) {
  return (
    <Link to={to} className={`summary-card tone-${tone}`}>
      <span className="tone-icon"><I /></span>
      <div><strong>{title}</strong><small>{text}</small></div>
      <ArrowRight className="summary-arrow" />
    </Link>
  );
}

export function QuickAction({ to, icon: I, title, text, tone }: { to: string; icon: Icon; title: string; text: string; tone: Tone }) {
  return (
    <Link to={to} className={`quick-action tone-${tone}`}>
      <span className="tone-icon"><I /></span>
      <div><strong>{title}</strong><small>{text}</small></div>
      <ChevronRight />
    </Link>
  );
}

export function StatusBadge({ status }: { status: Recommendation["status"] }) {
  return <span className={status === "Completed" ? "status-badge done" : "status-badge review"}>{status}</span>;
}

export function RecommendationTable({ rows, title = "Recent Recommendations", showViewAll = true }: { rows: Recommendation[]; title?: string; showViewAll?: boolean }) {
  return (
    <section className="panel-card">
      <div className="panel-head">
        <h2><FileText /> {title}</h2>
        {showViewAll && <Link to="/history">View All <ArrowRight /></Link>}
      </div>
      <div className="table-scroll">
        <table className="rec-table">
          <thead><tr><th>Date</th><th>Product / Requirement</th><th>Top Standard</th><th>Status</th><th>Match</th><th /></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td className="strong">{r.product}</td>
                <td><span className="std">{r.standard}</span><span className={`tag tag-${r.tag.toLowerCase()}`}>{r.tag}</span></td>
                <td><StatusBadge status={r.status} /></td>
                <td className="match">{r.match}%</td>
                <td><Link to="/recommendations/$id" params={{ id: r.id }} className="row-link" aria-label={`Open ${r.product}`}><ChevronRight /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
