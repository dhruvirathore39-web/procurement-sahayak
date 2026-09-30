import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  FileSearch,
  Languages,
  LockKeyhole,
  Mail,
  Network,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { type FormEvent, useState } from "react";

import { AiMark, GovernmentMark } from "../components/brand";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign In | AI Procurement Assistant" },
      { name: "description", content: "Secure access to evidence-backed Indian Standards recommendations for government procurement." },
      { property: "og:title", content: "AI Procurement Assistant — Government Procurement Portal" },
      { property: "og:description", content: "Find standards, verify compliance, and review evidence-backed procurement guidance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { label: "Find Relevant Standards", icon: FileSearch, tone: "blue" },
  { label: "Verify Compliance", icon: ShieldCheck, tone: "green" },
  { label: "Evidence-backed Recommendations", icon: Network, tone: "violet" },
  { label: "Multilingual Support", icon: Languages, tone: "teal" },
] as const;

function Index() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const enterDashboard = (name: string) => {
    sessionStorage.setItem("procurement-auth", JSON.stringify({ name }));
    navigate({ to: "/dashboard" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (identifier.trim().length < 3 || password.length < 4) {
      setError("Enter a valid user ID and a password of at least 4 characters.");
      return;
    }
    setError("");
    const displayName = identifier.includes("@") ? identifier.split("@")[0] : identifier;
    enterDashboard(displayName || "Procurement Officer");
  };

  return (
    <main className="login-page">
      <section className="login-intro" aria-labelledby="app-title">
        <div className="intro-arc" aria-hidden="true" />
        <div className="intro-content">
          <GovernmentMark />
          <div className="intro-copy">
            <h1 id="app-title">AI Procurement<br />Assistant</h1>
            <p className="intro-subtitle">Evidence-backed Indian Standards<br />Recommendation System</p>
            <p className="intro-support">For Procurement Officers &amp; Government Departments</p>
          </div>

          <div className="feature-row" aria-label="Assistant capabilities">
            {features.map(({ label, icon: Icon, tone }) => (
              <div className="feature-item" key={label}>
                <span className={`feature-icon ${tone}`}><Icon aria-hidden="true" /></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="parliament-scene" aria-hidden="true">
          <div className="parliament-flag" />
          <div className="parliament-dome" />
          <div className="parliament-body">
            {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
          </div>
          <div className="cityline"><span /><span /><span /><span /><span /></div>
        </div>
        <div className="wave wave-teal" aria-hidden="true" />
        <div className="wave wave-mid" aria-hidden="true" />
        <div className="wave wave-deep" aria-hidden="true" />
        <p className="national-motto">Better Standards <b>|</b> Smarter Procurement <b>|</b> Stronger India</p>
      </section>

      <section className="login-panel" aria-label="Sign in">
        <div className="login-card">
          <div className="card-mark-row"><span /><AiMark /><span /></div>
          <div className="login-heading">
            <h2>Welcome Back!</h2>
            <p>Sign in to access AI Procurement Assistant</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label className="input-shell">
              <Mail aria-hidden="true" />
              <span className="sr-only">Email or user ID</span>
              <input
                autoComplete="username"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Email / User ID"
              />
            </label>
            <label className="input-shell">
              <LockKeyhole aria-hidden="true" />
              <span className="sr-only">Password</span>
              <input
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
              <button
                className="visibility-toggle"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </label>
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <Button className="w-full" size="lg" type="submit">Login <ArrowRight /></Button>
          </form>

          <div className="or-divider"><span />OR<span /></div>
          <Button className="w-full" variant="outline" size="lg" onClick={() => enterDashboard("Demo User")}>
            <UserRound /> Continue as Demo User
          </Button>
          <div className="secure-note"><CheckCircle2 /> Secure <span>•</span> Government Portal</div>
        </div>
      </section>
    </main>
  );
}
