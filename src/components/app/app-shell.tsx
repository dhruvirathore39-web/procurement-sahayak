import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  ChevronDown,
  CircleHelp,
  Clock3,
  House,
  LogOut,
  Menu,
  Plus,
  Settings,
  UserRound,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { GovernmentMark } from "../brand";
import { AUTH_KEY } from "./data";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: House },
  { label: "New Recommendation", to: "/new-recommendation", icon: Plus },
  { label: "History", to: "/history", icon: Clock3 },
  { label: "Standards Library", to: "/standards", icon: BookOpen },
  { label: "Help & Support", to: "/help", icon: CircleHelp },
] as const;

export function Sidebar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className={open ? "app-sidebar" : "app-sidebar collapsed"}>
      <button className="sidebar-menu" onClick={onToggle} aria-label="Toggle menu"><Menu /></button>
      <nav>
        {nav.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to} className={path === to || (to === "/new-recommendation" && ["/processing", "/analysis", "/results"].includes(path)) ? "side-link active" : "side-link"} title={label}>
            <Icon /><span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-parliament" aria-hidden="true">
        <div className="sp-flag" /><div className="sp-dome" />
        <div className="sp-body">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</div>
      </div>
    </aside>
  );
}

export function ProfileDropdown({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div className="profile-menu" ref={ref}>
      <button className="profile-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="po-avatar">PO</span>
        <span className="profile-name">Procurement Officer</span>
        <ChevronDown />
      </button>
      {open && (
        <div className="profile-dropdown" role="menu">
          <Link to="/profile" role="menuitem"><UserRound /> Profile</Link>
          <Link to="/settings" role="menuitem"><Settings /> Settings</Link>
          <button role="menuitem" onClick={onLogout}><LogOut /> Logout</button>
        </div>
      )}
    </div>
  );
}

export function AppHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="app-header">
      <div className="app-header-brand">
        <GovernmentMark compact />
        <span className="header-divider" />
        <div><strong>AI Procurement Assistant</strong><small>Evidence-backed Indian Standards Recommendation System</small></div>
      </div>
      <div className="app-header-actions">
        <button className="bell" aria-label="Notifications"><Bell /><i /></button>
        <ProfileDropdown onLogout={onLogout} />
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (!sessionStorage.getItem(AUTH_KEY)) navigate({ to: "/", replace: true });
  }, [navigate]);
  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    navigate({ to: "/", replace: true });
  };
  return (
    <div className="app-shell">
      <Sidebar open={open} onToggle={() => setOpen((o) => !o)} />
      <div className="app-body">
        <AppHeader onLogout={logout} />
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}

export function ScreenPlaceholder({ title, description, icon: Icon, children }: { title: string; description: string; icon: typeof House; children?: ReactNode }) {
  return (
    <section className="screen-card">
      <div className="screen-head"><span><Icon /></span><div><h1>{title}</h1><p>{description}</p></div></div>
      {children}
      <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
    </section>
  );
}
