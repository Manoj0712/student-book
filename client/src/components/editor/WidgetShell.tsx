import type { WidgetShellProps } from "../../types/book";
import WidgetRenderer from "../shared/WidgetRenderer";

function WidgetShell({
  widget,
  selected,
  editable,
  onSelect,
  onDelete,
}: WidgetShellProps) {

  return (
    <div
      onMouseDown={onSelect}
      onTouchStart={onSelect}
      className={`w-full h-full relative group ${editable ? "cursor-move" : ""
        } ${selected ? "ring-2 ring-accent" : "ring-1 ring-transparent hover:ring-line"}`}
    >
      {editable && (
        <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded bg-ink/80 text-white text-[10px] leading-none opacity-0 group-hover:opacity-100 pointer-events-none max-w-[calc(100%-1.5rem)] truncate">
          {widget.type}
        </div>
      )}
      {editable && (
        <button
          type="button"
          className="no-drag absolute top-1 right-1 z-20 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto shadow"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={`Delete ${widget.type} widget`}
        >
          ×
        </button>
      )}
      <div className="w-full h-full pointer-events-none">
        <WidgetRenderer widget={widget} />
      </div>
    </div>
  );
}

export default WidgetShell;