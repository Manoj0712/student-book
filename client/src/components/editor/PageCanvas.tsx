import { useMemo } from "react";
import { map, size } from "lodash";
import GridLayout, { type Layout } from "react-grid-layout";
import type { PageCanvasProps } from "../../types/book";
import { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_COLS, ROW_HEIGHT, GRID_ROWS } from "../../utils/grid";
import WidgetShell from "./WidgetShell";

function PageCanvas({
  pageIndex,
  pageCount,
  widgets,
  zoom,
  editable,
  selectedId,
  onSelect,
  onLayoutChange,
  onDelete,
}: PageCanvasProps) {

  const layout: Layout[] = useMemo(
    () => map(widgets, (w) => ({
      i: w.id,
      x: w?.layout?.x ?? 0,
      y: w?.layout?.y ?? 0,
      w: w?.layout?.w ?? 0,
      h: w?.layout?.h ?? 0
    })),
    [widgets]
  );

  return (
    <div>
      {pageCount > 1 && (
        <div className="text-center text-[11px] font-medium text-ink/40 uppercase tracking-wide mb-2">
          Page {pageIndex + 1} of {pageCount}
        </div>
      )}
      <div
        style={{
          width: CANVAS_WIDTH * (zoom / 100),
          height: CANVAS_HEIGHT * (zoom / 100),
        }}
      >
        <div
          className="bg-canvas shadow-panel rounded-sm relative overflow-hidden"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
          }}
          onClick={() => onSelect(null)}
        >
          <GridLayout
            className="layout"
            layout={layout}
            cols={GRID_COLS}
            rowHeight={ROW_HEIGHT}
            width={CANVAS_WIDTH}
            maxRows={GRID_ROWS}
            margin={[0, 0]}
            containerPadding={[0, 0]}
            compactType={null}
            preventCollision={false}
            isBounded
            isDraggable={editable}
            isResizable={editable}
            onLayoutChange={onLayoutChange}
            draggableCancel=".no-drag"
          >
            {map(widgets, (w) => (
              <div key={w.id} onClick={(e) => e.stopPropagation()} style={{ zIndex: selectedId === w.id ? 30 : undefined }}>
                <WidgetShell
                  widget={w}
                  selected={selectedId === w.id}
                  editable={editable}
                  onSelect={() => onSelect(w.id)}
                  onDelete={() => onDelete(w.id)}
                />
              </div>
            ))}
          </GridLayout>

          {size(widgets) === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-ink/30 text-sm pointer-events-none">
              Add a component from the toolbar to get started
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageCanvas;