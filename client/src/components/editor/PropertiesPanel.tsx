import type { PropertiesPanelProps } from "../../types/book";
import FieldsFor from "./FieldsFor";

export default function PropertiesPanel({ widget,
  onChangeProps,
  onDelete,
  onReorder,
  onClose }: PropertiesPanelProps) {


  const getPanacelBody = () => {

    return !widget ? (
      <div className="flex-1 flex items-center justify-center text-center px-6 text-sm text-ink/40">
        Select a component on the canvas to edit its properties.
      </div>
    ) : (
      <div className="flex-1 overflow-y-auto thin-scroll px-4 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">{widget.type}</span>
          <button onClick={onClose} className="sm:hidden text-ink/40 text-lg leading-none px-1">
            ×
          </button>
        </div>

        <FieldsFor widget={widget} onChangeProps={onChangeProps} />

        <div className="border-t border-line pt-3 flex flex-col gap-2">
          <span className="text-[11px] font-medium text-ink/40 uppercase tracking-wide">Layer order</span>
          <div className="flex gap-2">
            <button
              onClick={() => onReorder(widget.id, "back")}
              className="flex-1 px-2.5 py-1.5 rounded-md border border-line text-xs font-medium text-ink/70 hover:bg-surface"
            >
              Send to Back
            </button>
            <button
              onClick={() => onReorder(widget.id, "front")}
              className="flex-1 px-2.5 py-1.5 rounded-md border border-line text-xs font-medium text-ink/70 hover:bg-surface"
            >
              Bring to Front
            </button>
          </div>
        </div>

        <button
          onClick={() => onDelete(widget.id)}
          className="mt-1 px-2.5 py-2 rounded-md border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50"
        >
          Delete component
        </button>
      </div>
    );

  }

  return (
    <>
      <aside className="hidden sm:flex w-72 shrink-0 border-l border-line bg-white flex-col">
        <div className="h-11 flex items-center px-4 border-b border-line">
          <span className="text-sm font-semibold">Properties</span>
        </div>
        {getPanacelBody()}
      </aside>

      {widget && (
        <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 bg-white border-t border-line rounded-t-2xl shadow-panel max-h-[60vh] flex flex-col">
          <div className="w-10 h-1 rounded-full bg-line mx-auto mt-2 mb-1" />
          {getPanacelBody()}
        </div>
      )}
    </>
  );
}
