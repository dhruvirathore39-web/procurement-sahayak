import { createFileRoute } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";
import { recommendations } from "../components/app/data";
import { RecommendationTable } from "../components/app/widgets";

export const Route = createFileRoute("/pending-review")({
  head: () => ({
    meta: [
      { title: "Pending Review | AI Procurement Assistant" },
      { name: "description", content: "Recommendations awaiting approval." },
      { property: "og:title", content: "Pending Review | AI Procurement Assistant" },
      { property: "og:description", content: "Recommendations awaiting approval." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ScreenPlaceholder title="Pending Review" description="Recommendations awaiting approval." icon={TriangleAlert}><RecommendationTable rows={recommendations.filter((r) => r.status === "Under Review")} title="Awaiting Review" showViewAll={false} /></ScreenPlaceholder>
    </AppShell>
  ),
});
