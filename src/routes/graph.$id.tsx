import { createFileRoute, notFound } from "@tanstack/react-router";
import { Network } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";
import { standards } from "../components/app/standards";

export const Route = createFileRoute("/graph/$id")({
  loader: ({ params }) => {
    const s = standards[params.id];
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Standards Relationship Graph — ${loaderData?.number ?? ""} | AI Procurement Assistant` },
      { name: "description", content: "Visual map of primary, allied and normative standards." },
      { property: "og:title", content: "Standards Relationship Graph | AI Procurement Assistant" },
      { property: "og:description", content: "Visual map of primary, allied and normative standards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const s = Route.useLoaderData();
  return (
    <AppShell>
      <ScreenPlaceholder title="Standards Relationship Graph" description={`${s.number} — ${s.title}`} icon={Network}>
        <p className="screen-note">Visual map of primary, allied and normative standards. This screen is coming next in the prototype.</p>
      </ScreenPlaceholder>
    </AppShell>
  );
}
