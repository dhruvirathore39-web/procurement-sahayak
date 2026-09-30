import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  ChevronRight,
  FilePlus2,
  FileText,
  Globe,
  House,
  Languages,
  PenLine,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { type DragEvent, type FormEvent, useRef, useState } from "react";

import { AppShell } from "../components/app/app-shell";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/new-recommendation")({
  head: () => ({
    meta: [
      { title: "New Recommendation | AI Procurement Assistant" },
      { name: "description", content: "Create a new procurement requirement and upload a tender or specification document for Indian Standards recommendations." },
      { property: "og:title", content: "Create New Procurement Requirement" },
      { property: "og:description", content: "Enter product details and specifications to get evidence-backed Indian Standards recommendations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewRecommendation,
});

const languages = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Bengali", "Gujarati", "Kannada", "Malayalam", "Punjabi"];
const allowed = ["pdf", "doc", "docx"];
const MAX = 2000;

type Errors = Partial<Record<"product" | "specs" | "file" | "language", string | undefined>>;

function NewRecommendation() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState("");
  const [specs, setSpecs] = useState("");
  const [language, setLanguage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const clear = (k: keyof Errors) => setErrors((e) => ({ ...e, [k]: undefined }));

  const pickFile = (f?: File | null) => {
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowed.includes(ext)) {
      setErrors((e) => ({ ...e, file: "Only PDF, DOC or DOCX files are supported." }));
      return;
    }
    setFile(f);
    setErrors((e) => ({ ...e, file: undefined }));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!product.trim()) next.product = "Please enter the product or equipment name.";
    if (!specs.trim()) next.specs = "Please enter the technical specifications.";
    if (!file) next.file = "Please upload a tender or specification document.";
    if (!language) next.language = "Please select a language.";
    setErrors(next);
    if (Object.keys(next).length) return;
    sessionStorage.setItem("procurement-request", JSON.stringify({ product: product.trim(), specs: specs.trim(), language, fileName: file!.name }));
    setLoading(true);
    window.setTimeout(() => navigate({ to: "/results" }), 700);
  };

  const ext = file?.name.split(".").pop()?.toUpperCase();

  return (
    <AppShell>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <House /><ChevronRight />
        <Link to="/dashboard">Dashboard</Link><ChevronRight />
        <span>New Recommendation</span>
      </nav>

      <div className="newrec-layout">
        <form className="panel-card newrec-form" onSubmit={submit} noValidate>
          <div className="screen-head">
            <span><FilePlus2 /></span>
            <div>
              <h1>Create New Procurement Requirement</h1>
              <p>Provide the details of your product/equipment and upload tender or specification document.</p>
            </div>
          </div>

          <div className="field">
            <label htmlFor="product">Product / Equipment Name <b>*</b></label>
            <div className={errors.product ? "field-input invalid" : "field-input"}>
              <Box />
              <input id="product" value={product} onChange={(e) => { setProduct(e.target.value); clear("product"); }} placeholder="e.g. Solar Water Pump" />
            </div>
            {errors.product && <p className="field-error">{errors.product}</p>}
          </div>

          <div className="field">
            <label htmlFor="specs">Technical Specifications <b>*</b></label>
            <div className={errors.specs ? "field-textarea invalid" : "field-textarea"}>
              <textarea id="specs" rows={6} maxLength={MAX} value={specs} onChange={(e) => { setSpecs(e.target.value); clear("specs"); }} placeholder={"Enter technical requirements, specifications, capacity,\nmaterial, safety requirements..."} />
              <span className="char-count">{specs.length}/{MAX}</span>
            </div>
            {errors.specs && <p className="field-error">{errors.specs}</p>}
          </div>

          <div className="field">
            <label>Upload Tender / Specification <b>*</b></label>
            <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" hidden onChange={(e) => { pickFile(e.target.files?.[0]); e.target.value = ""; }} />
            <div
              className={`dropzone${dragging ? " dragging" : ""}${errors.file ? " invalid" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => !file && inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" && !file) inputRef.current?.click(); }}
            >
              {file ? (
                <div className="file-chip" onClick={(e) => e.stopPropagation()}>
                  <span className="file-icon"><FileText /></span>
                  <div><strong>{file.name}</strong><small>{ext} document · {(file.size / 1024).toFixed(0)} KB</small></div>
                  <button type="button" onClick={() => setFile(null)} aria-label="Remove file"><Trash2 /></button>
                </div>
              ) : (
                <>
                  <span className="drop-icon"><Upload /></span>
                  <p>Drag and drop PDF, DOC or DOCX<br />or click to upload</p>
                  <Button type="button" variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
                    <Upload /> Upload PDF
                  </Button>
                </>
              )}
            </div>
            {errors.file && <p className="field-error">{errors.file}</p>}
          </div>

          <div className="field">
            <label htmlFor="language">Language <b>*</b></label>
            <div className={errors.language ? "field-input invalid" : "field-input"}>
              <Globe />
              <select id="language" value={language} onChange={(e) => { setLanguage(e.target.value); clear("language"); }} className={language ? "" : "placeholder"}>
                <option value="" disabled>Select language</option>
                {languages.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            {errors.language && <p className="field-error">{errors.language}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full generate-btn" disabled={loading}>
            <Sparkles /> {loading ? "Generating…" : "Generate Recommendations"} <ArrowRight />
          </Button>
        </form>

        <aside className="help-panel">
          <div className="help-art" aria-hidden="true">
            <span className="ha-doc"><FileText /><i /><i /></span>
            <span className="ha-upload"><Upload /></span>
            <span className="ha-bubble one">अ</span>
            <span className="ha-bubble two">A</span>
            <span className="ha-ai"><Sparkles /></span>
          </div>
          <h2>Need help with your input?</h2>
          <p>You can provide the specification in multiple ways:</p>
          <ul>
            <li><span className="tone-icon tone-blue"><Upload /></span><div><strong>Upload tender document (PDF, DOC, DOCX)</strong><small>Your AI will extract key requirements automatically.</small></div></li>
            <li><span className="tone-icon tone-violet"><PenLine /></span><div><strong>Enter specifications manually</strong><small>Type or paste technical details directly.</small></div></li>
            <li><span className="tone-icon tone-green"><Languages /></span><div><strong>Use any language</strong><small>Supports English, Hindi, Marathi, Tamil and more.</small></div></li>
          </ul>
          <div className="secure-box"><ShieldCheck /><span>Your data is secure and used only for generating relevant standards recommendations.</span></div>
        </aside>
      </div>
    </AppShell>
  );
}
