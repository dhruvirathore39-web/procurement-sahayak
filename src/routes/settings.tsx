import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";


export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | AI Procurement Assistant" },
      { name: "description", content: "Manage your preferences for the assistant." },
      { property: "og:title", content: "Settings | AI Procurement Assistant" },
      { property: "og:description", content: "Manage your preferences for the assistant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ScreenPlaceholder title="Settings" description="Manage your preferences for the assistant." icon={Settings}><p className="screen-note">This screen is coming next in the prototype.</p></ScreenPlaceholder>
    </AppShell>
  ),
});
