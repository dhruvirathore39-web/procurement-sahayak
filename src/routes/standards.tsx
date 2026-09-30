import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";


export const Route = createFileRoute("/standards")({
  head: () => ({
    meta: [
      { title: "Standards Library | AI Procurement Assistant" },
      { name: "description", content: "Search and explore 1,250+ Indian Standards." },
      { property: "og:title", content: "Standards Library | AI Procurement Assistant" },
      { property: "og:description", content: "Search and explore 1,250+ Indian Standards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ScreenPlaceholder title="Standards Library" description="Search and explore 1,250+ Indian Standards." icon={BookOpen}><p className="screen-note">This screen is coming next in the prototype.</p></ScreenPlaceholder>
    </AppShell>
  ),
});
