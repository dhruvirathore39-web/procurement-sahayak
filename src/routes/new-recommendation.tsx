import { createFileRoute } from "@tanstack/react-router";
import { FilePlus2 } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";


export const Route = createFileRoute("/new-recommendation")({
  head: () => ({
    meta: [
      { title: "New Recommendation | AI Procurement Assistant" },
      { name: "description", content: "Describe a product or service to find applicable Indian Standards." },
      { property: "og:title", content: "New Recommendation | AI Procurement Assistant" },
      { property: "og:description", content: "Describe a product or service to find applicable Indian Standards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ScreenPlaceholder title="New Recommendation" description="Describe a product or service to find applicable Indian Standards." icon={FilePlus2}><p className="screen-note">This screen is coming next in the prototype.</p></ScreenPlaceholder>
    </AppShell>
  ),
});
