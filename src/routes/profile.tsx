import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";


export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile | AI Procurement Assistant" },
      { name: "description", content: "Your procurement officer profile details." },
      { property: "og:title", content: "Profile | AI Procurement Assistant" },
      { property: "og:description", content: "Your procurement officer profile details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ScreenPlaceholder title="Profile" description="Your procurement officer profile details." icon={UserRound}><p className="screen-note">Procurement Officer · Demo account</p></ScreenPlaceholder>
    </AppShell>
  ),
});
