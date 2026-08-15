import type { BookPage } from "../../types/book";
import { CANVAS_WIDTH, CANVAS_HEIGHT, layoutToPercent, groupByPage, getPageCount } from "../../utils/grid";
import WidgetRenderer from "../shared/WidgetRenderer";
import { map, size } from 'lodash';

interface Props {
  book: BookPage;
}

export default function ReaderCanvas({ book }: Props) {
  const isLandscape = book.orientation === "landscape";
  const aspect = isLandscape ? `${CANVAS_HEIGHT} / ${CANVAS_WIDTH}` : `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`;

  const pages = groupByPage(book.widgets);
  const pageCount = getPageCount(book.widgets);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {Array.from({ length: pageCount }, (_, pageIndex) => {
        const widgets = pages.get(pageIndex) ?? [];
        return (
          <div key={pageIndex}>
            {pageCount > 1 && (
              <div className="text-center text-[11px] font-medium text-ink/35 uppercase tracking-wide mb-2">
                Page {pageIndex + 1} of {pageCount}
              </div>
            )}
            <div
              className="relative w-full bg-canvas rounded-md shadow-panel overflow-hidden"
              style={{ aspectRatio: aspect }}
            >
              {map(widgets, (widget) => {
                const { leftPct, topPct, widthPct, heightPct } = layoutToPercent(widget.layout);
                return (
                  <div
                    key={widget.id}
                    className="absolute"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      width: `${widthPct}%`,
                      height: `${heightPct}%`,
                    }}
                  >
                    <WidgetRenderer widget={widget} />
                  </div>
                );
              })}

              {size(widgets) === 0 && pageCount === 1 && (
                <div className="absolute inset-0 flex items-center justify-center text-ink/30 text-sm px-6 text-center">
                  This page has no components yet.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
