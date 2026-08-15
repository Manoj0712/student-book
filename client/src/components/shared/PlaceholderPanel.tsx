
function PlaceholderPanel({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 rounded-sm bg-gradient-to-br from-accent-light to-white border border-accent/20 text-center px-2">
      <span className="text-2xl" aria-hidden>
        {icon === "cube" ? "◧" : "◔"}
      </span>
      <span className="text-xs font-semibold text-accent">{label}</span>
      <span className="text-[10px] text-ink/40 leading-tight">{sub}</span>
    </div>
  );
}

export default PlaceholderPanel;