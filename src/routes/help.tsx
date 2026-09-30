import { createFileRoute } from "@tanstack/react-router";
import { CircleHelp } from "lucide-react";

import { AppShell, ScreenPlaceholder } from "../components/app/app-shell";


export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support | AI Procurement Assistant" },
      { name: "description", content: "FAQs, guides and user support." },
      { property: "og:title", content: "Help & Support | AI Procurement Assistant" },
      { property: "og:description", content: "FAQs, guides and user support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AppShell>
      <ScreenPlaceholder title="Help & Support" description="FAQs, guides and user support." icon={CircleHelp}><p className="screen-note">This screen is coming next in the prototype.</p></ScreenPlaceholder>
    </AppShell>
  ),
});
