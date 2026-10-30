import type { ReactNode } from "react";
import type { MemeDraft } from "../../types/meme";

export interface EditorProps {
  draft: MemeDraft;
  onChange: (updates: Partial<MemeDraft>) => void;
}

export function fieldLabel(label: string, control: ReactNode) {
  return (
    <label className="field">
      <span>{label}</span>
      {control}
    </label>
  );
}
