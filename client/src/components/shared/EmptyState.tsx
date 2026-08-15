

function EmptyState({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-sm border border-dashed border-line bg-white/60 text-ink/40 text-xs gap-1">
      <span className="font-medium">{label}</span>
      <span>{hint}</span>
    </div>
  );
}

export default EmptyState;  