import { BrainCircuit, Landmark } from "lucide-react";

export function GovernmentMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "government-mark compact" : "government-mark"} aria-label="Government of India">
      <Landmark aria-hidden="true" />
      <div>
        <strong>भारत सरकार</strong>
        <span>Government of India</span>
      </div>
    </div>
  );
}

export function AiMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "ai-mark compact" : "ai-mark"} aria-hidden="true">
      <BrainCircuit />
      <span>AI</span>
    </div>
  );
}