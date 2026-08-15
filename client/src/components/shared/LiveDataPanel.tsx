import { useEffect, useState } from "react";

function LiveDataPanel({ label, source }: { label: string; source?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v + Math.random() * 10 - 5 + 50) % 100), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 rounded-sm bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 text-center px-2">
      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
      </span>
      <span className="text-xs font-semibold text-ink">{label}</span>
      <span className="font-mono text-lg text-emerald-700">{value.toFixed(1)}</span>
      {source && <span className="text-[10px] text-ink/40 truncate max-w-full">{source}</span>}
    </div>
  );
}

export default LiveDataPanel;