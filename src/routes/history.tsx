import { createFileRoute } from "@tanstack/react-router";
import { Clock3 } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";
import { recommendations } from "../components/app/data";
import { RecommendationTable } from "../components/app/widgets";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Recommendation History | AI Procurement Assistant" },
      { name: "description", content: "All your past recommendations and results." },
      { property: "og:title", content: "Recommendation History | AI Procurement Assistant" },
      { property: "og:description", content: "All your past recommendations and results." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ScreenPlaceholder title="Recommendation History" description="All your past recommendations and results." icon={Clock3}><RecommendationTable rows={recommendations} title="All Recommendations" showViewAll={false} /></ScreenPlaceholder>
    </AppShell>
  ),
});
