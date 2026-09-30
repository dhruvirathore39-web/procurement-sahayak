import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  CheckCircle2,
  Clock3,
  FileCheck2,
  LogOut,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import { AiMark, GovernmentMark } from "../components/brand";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Procurement Dashboard | AI Procurement Assistant" },
      { name: "description", content: "Ask procurement questions and review recommended Indian Standards, compliance checks, and supporting evidence." },
      { property: "og:title", content: "AI Procurement Assistant Dashboard" },
      { property: "og:description", content: "Evidence-backed standards and compliance support for public procurement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const examples = [
  "Find standards for electrical equipment",
  "Check compliance requirements",
  "Recommend relevant Indian Standards",
];

const panels = [
  { title: "Recommended Standards", icon: BookOpenCheck, text: "IS 302 (Part 1): 2008", detail: "Safety of household and similar electrical appliances", status: "2 standards matched" },
  { title: "Compliance Verification", icon: ShieldCheck, text: "Core requirements identified", detail: "BIS certification, product marking, and test reports", status: "Ready to review" },
  { title: "Evidence & Sources", icon: FileCheck2, text: "Bureau of Indian Standards", detail: "References ranked by relevance and authority", status: "4 sources available" },
] as const;

function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("Demo User");
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("electrical equipment");
  const [recent, setRecent] = useState<string[]>(["Electrical equipment standards", "Office furniture compliance"]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("procurement-auth");
    if (!stored) {
      navigate({ to: "/", replace: true });
      return;
    }
    try {
      const auth = JSON.parse(stored) as { name?: string };
      if (auth.name) setName(auth.name);
    } catch {
      sessionStorage.removeItem("procurement-auth");
      navigate({ to: "/", replace: true });
    }
  }, [navigate]);

  const runSearch = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    setQuery(clean);
    setLoading(true);
    window.setTimeout(() => {
      setActiveQuery(clean);
      setRecent((items) => [clean, ...items.filter((item) => item !== clean)].slice(0, 4));
      setLoading(false);
    }, 450);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch(query);
  };

  const logout = () => {
    sessionStorage.removeItem("procurement-auth");
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="header-brand">
            <GovernmentMark compact />
            <span className="header-divider" />
            <AiMark compact />
            <div><strong>AI Procurement Assistant</strong><small>Government Procurement Portal</small></div>
          </div>
          <div className="profile-area">
            <span className="avatar"><UserRound /></span>
            <span className="profile-copy"><strong>{name}</strong><small>Procurement Officer</small></span>
            <Button variant="ghost" size="sm" onClick={logout}><LogOut /> Logout</Button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="assistant-prompt">
          <span className="prompt-kicker"><Sparkles /> Evidence-backed procurement guidance</span>
          <h1>How can I help with your procurement?</h1>
          <p>Describe your requirement to find relevant Indian Standards and compliance guidance.</p>
          <form className="ask-form" onSubmit={handleSubmit}>
            <Search aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter a product, service, or compliance requirement..." aria-label="Procurement requirement" />
            <Button type="submit" disabled={loading}>{loading ? "Reviewing…" : "Search / Ask AI"}<ArrowRight /></Button>
          </form>
          <div className="example-row">
            <span>Try an example:</span>
            {examples.map((example) => <button key={example} onClick={() => runSearch(example)}>{example}</button>)}
          </div>
        </section>

        <section className="results-heading">
          <div><span className="result-icon"><Bot /></span><div><small>AI RESPONSE FOR</small><h2>{activeQuery}</h2></div></div>
          <span className="verified-label"><CheckCircle2 /> Sources verified</span>
        </section>

        <section className="result-grid" aria-label="Procurement results">
          {panels.map(({ title, icon: Icon, text, detail, status }) => (
            <article className="result-card" key={title}>
              <div className="result-card-title"><span><Icon /></span><h3>{title}</h3></div>
              <strong>{text}</strong>
              <p>{detail}</p>
              <button>View details <ArrowRight /></button>
              <footer><CheckCircle2 /> {status}</footer>
            </article>
          ))}
          <aside className="recent-card">
            <div className="result-card-title"><span><Clock3 /></span><h3>Recent Searches</h3></div>
            <ul>{recent.map((item, index) => <li key={`${item}-${index}`}><button onClick={() => runSearch(item)}><Search /> <span>{item}</span><ArrowRight /></button></li>)}</ul>
          </aside>
        </section>
      </main>
    </div>
  );
}