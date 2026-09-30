import { createFileRoute, notFound } from "@tanstack/react-router";
import { History } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";
import { standards } from "../components/app/standards";

export const Route = createFileRoute("/amendments/$id")({
  loader: ({ params }) => {
    const s = standards[params.id];
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Version & Amendment Check — ${loaderData?.number ?? ""} | AI Procurement Assistant` },
      { name: "description", content: "Latest versions and amendments for the selected standard." },
      { property: "og:title", content: "Version & Amendment Check | AI Procurement Assistant" },
      { property: "og:description", content: "Latest versions and amendments for the selected standard." },
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
      <ScreenPlaceholder title="Version & Amendment Check" description={`${s.number} — ${s.title}`} icon={History}>
        <p className="screen-note">Latest versions and amendments for the selected standard. This screen is coming next in the prototype.</p>
      </ScreenPlaceholder>
    </AppShell>
  );
}
