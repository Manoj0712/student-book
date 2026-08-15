import { useMemo, useState } from "react";
import type { CanvasProps } from "../../types/book";
import { CANVAS_WIDTH, groupByPage, getPageCount } from "../../utils/grid";
import PageCanvas from "./PageCanvas";
import { ZOOM_LEVELS } from "../../constrains";
import { map } from "lodash";

export default function Canvas({
  widgets,
  pageCountOverride,
  selectedId,
  isPreview,
  onSelect,
  onLayoutChange,
  onDelete,
  onAddPage
}: CanvasProps) {

  const [zoom, setZoom] = useState<number>(100);
  const editable = !isPreview && zoom === 100;
  const pages = useMemo(() => groupByPage(widgets), [widgets]);
  const pageCount = Math.max(getPageCount(widgets), pageCountOverride ?? 1);

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-surface">
      {!isPreview && (
        <div className="flex items-center justify-center gap-1 py-2 border-b border-line bg-white sm:hidden">
          {map(ZOOM_LEVELS, (z) => (
            <button
              key={z}
              onClick={() => setZoom(z)}
              className={`px-2.5 py-1 rounded text-xs font-medium ${zoom === z ? "bg-accent text-white" : "bg-surface text-ink/60"
                }`}
            >
              {z}%
            </button>
          ))}
          {zoom !== 100 && <span className="text-[11px] text-ink/40 ml-1">Tap 100% to edit</span>}
        </div>
      )}

      <div className="flex-1 overflow-auto thin-scroll p-4 sm:p-8 flex flex-col items-center gap-8">
        {Array.from({ length: pageCount }, (_, pageIndex) => (
          <PageCanvas
            key={pageIndex}
            pageIndex={pageIndex}
            pageCount={pageCount}
            widgets={pages.get(pageIndex) ?? []}
            zoom={zoom}
            editable={editable}
            selectedId={selectedId}
            onSelect={onSelect}
            onLayoutChange={(layout) => onLayoutChange(pageIndex, layout)}
            onDelete={onDelete}
          />
        ))}

        {!isPreview && (
          <button
            onClick={onAddPage}
            className="px-4 py-2 rounded-md border border-dashed border-line text-sm font-medium text-ink/50 hover:text-accent hover:border-accent transition-colors"
            style={{ width: CANVAS_WIDTH * (zoom / 100) }}
          >
            + Add page
          </button>
        )}
      </div>
    </div>
  );
}

