import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";
import { standards } from "../components/app/standards";

export const Route = createFileRoute("/certification/$id")({
  loader: ({ params }) => {
    const s = standards[params.id];
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Certification / QCO Check — ${loaderData?.number ?? ""} | AI Procurement Assistant` },
      { name: "description", content: "Certification and quality-control order requirements." },
      { property: "og:title", content: "Certification / QCO Check | AI Procurement Assistant" },
      { property: "og:description", content: "Certification and quality-control order requirements." },
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
      <ScreenPlaceholder title="Certification / QCO Check" description={`${s.number} — ${s.title}`} icon={ShieldCheck}>
        <p className="screen-note">Certification and quality-control order requirements. This screen is coming next in the prototype.</p>
      </ScreenPlaceholder>
    </AppShell>
  );
}
