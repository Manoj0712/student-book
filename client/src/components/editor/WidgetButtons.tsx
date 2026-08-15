import { map } from "lodash";
import { WIDGET_BUTTONS } from "../../constrains";
import type { WidgetType } from "../../types/book";

export const WidgetButtons = ({ onAddWidget }: { onAddWidget: (type: WidgetType) => void; }) => {

  return (
    <div className="flex items-center gap-1.5 px-3 sm:px-4 pb-2.5 overflow-x-auto thin-scroll">
      <span className="text-[11px] font-medium text-ink/40 uppercase tracking-wide shrink-0 mr-1">Add:</span>
      {map(WIDGET_BUTTONS, (btn) => (
        <button
          key={btn.type}
          onClick={() => onAddWidget(btn.type)}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-line text-xs font-medium text-ink/70 hover:border-accent hover:text-accent hover:bg-accent-light transition-colors"
        >
          <span className="text-sm leading-none">{btn.icon}</span>
          {btn.label}
        </button>
      ))}
    </div>
  )
}