import type React from "react";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-ink/60">{label}</span>
      {children}
    </label>
  );
}

export default Field;