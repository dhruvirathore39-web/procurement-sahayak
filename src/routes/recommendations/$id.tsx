import { createFileRoute, notFound } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../../components/app/app-shell";
import { recommendations } from "../../components/app/data";
import { StatusBadge } from "../../components/app/widgets";

export const Route = createFileRoute("/recommendations/$id")({
  loader: ({ params }) => {
    const rec = recommendations.find((r) => r.id === params.id);
    if (!rec) throw notFound();
    return rec;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product ?? "Recommendation"} | AI Procurement Assistant` },
      { name: "description", content: `Recommended Indian Standard for ${loaderData?.product ?? "this requirement"}.` },
      { property: "og:title", content: `${loaderData?.product ?? "Recommendation"} — Recommendation Details` },
      { property: "og:description", content: "Evidence-backed Indian Standards recommendation details." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Details,
});

function Details() {
  const r = Route.useLoaderData();
  return (
    <AppShell>
      <ScreenPlaceholder title={r.product} description={`Recommendation created on ${r.date}`} icon={FileCheck2}>
        <dl className="detail-grid">
          <div><dt>Top Standard</dt><dd>{r.standard}</dd></div>
          <div><dt>Title</dt><dd>{r.title}</dd></div>
          <div><dt>Relation</dt><dd>{r.tag}</dd></div>
          <div><dt>Status</dt><dd><StatusBadge status={r.status} /></dd></div>
          <div><dt>Match</dt><dd>{r.match}%</dd></div>
        </dl>
      </ScreenPlaceholder>
    </AppShell>
  );
}
