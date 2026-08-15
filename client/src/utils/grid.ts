import { v4 as uuidv4 } from "uuid";
import type { Widget, WidgetType, WidgetLayout, WidgetProps } from "../types/book";

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 1000;
export const GRID_COLS = 80;
export const ROW_HEIGHT = 10;
export const GRID_ROWS = CANVAS_HEIGHT / ROW_HEIGHT;
const TOP_MARGIN_ROWS = 2;

export function layoutToPercent(layout: WidgetLayout) {
  return {
    leftPct: (layout.x / GRID_COLS) * 100,
    topPct: ((layout.y * ROW_HEIGHT) / CANVAS_HEIGHT) * 100,
    widthPct: (layout.w / GRID_COLS) * 100,
    heightPct: ((layout.h * ROW_HEIGHT) / CANVAS_HEIGHT) * 100,
  };
}

const DEFAULT_SIZE: Record<WidgetType, { w: number; h: number }> = {
  // Text starts tall enough for a few wrapped lines (12 rows ≈ 120px) —
  // the old 6-row default barely fit one line, which combined with the
  // clipped/collapsed-newline rendering bug made multi-line text look broken.
  Text: { w: 30, h: 12 },
  Image: { w: 30, h: 25 },
  Video: { w: 40, h: 30 },
  Audio: { w: 30, h: 6 },
  "3DObject": { w: 30, h: 25 },
  LiveData: { w: 30, h: 15 },
};

const DEFAULT_PROPS: Record<WidgetType, WidgetProps> = {
  Text: { text: "New text block", fontSize: 18, color: "#1c1f26", fontWeight: "normal", align: "left", tag: "p" },
  Image: { url: "https://picsum.photos/seed/book/400/300", alt: "Placeholder image" },
  Video: { url: "" },
  Audio: { url: "" },
  "3DObject": { modelUrl: "", label: "3D Object" },
  LiveData: { source: "", label: "Live Data" },
};


export function groupByPage(widgets: Widget[]): Map<number, Widget[]> {
  const map = new Map<number, Widget[]>();
  for (const w of widgets) {
    const page = w?.layout?.page ?? 0;
    if (!map.has(page)) map.set(page, []);
    map.get(page)!.push(w);
  }
  return map;
}

export function getPageCount(widgets: Widget[]): number {
  if (widgets.length === 0) return 1;
  return Math.max(...widgets.map((w) => w?.layout?.page ?? 0)) + 1;
}

function nextFreeSlot(existing: Widget[], height: number): { page: number; y: number } {
  const pageCount = getPageCount(existing);
  for (let page = 0; page < pageCount; page++) {
    const onPage = existing.filter((w) => (w?.layout?.page ?? 0) === page);
    const bottom = onPage.length === 0 ? TOP_MARGIN_ROWS : Math.max(...onPage.map((w) => (w?.layout?.y ?? 0) + (w?.layout?.h ?? 0))) + 1;
    if (bottom + height <= GRID_ROWS) {
      return { page, y: bottom };
    }
  }

  return { page: pageCount, y: TOP_MARGIN_ROWS };
}

export function createDefaultWidget(type: WidgetType, existing: Widget[]): Widget {
  const size = DEFAULT_SIZE[type];
  const slot = nextFreeSlot(existing, size.h);
  return {
    id: uuidv4(),
    type,
    props: { ...DEFAULT_PROPS[type] },
    layout: { page: slot.page, x: 4, y: slot.y, w: size.w, h: size.h },
  };
}

export function normalizeWidgets(widgets: Widget[]): Widget[] {
  const placed: Widget[] = [];

  for (const w of widgets) {
    const size = DEFAULT_SIZE[w.type] ?? { w: 30, h: 10 };
    const hasValidLayout =
      w.layout &&
      typeof w.layout.x === "number" &&
      typeof w.layout.y === "number" &&
      typeof w.layout.w === "number" &&
      typeof w.layout.h === "number" &&
      w.layout.y + w.layout.h <= GRID_ROWS;

    const layout: WidgetLayout = hasValidLayout
      ? { ...w.layout, page: w?.layout?.page ?? 0 }
      : (() => {
        const slot = nextFreeSlot(placed, size.h);
        return { page: slot?.page, x: 4, y: slot?.y, w: size?.w, h: size?.h };
      })();

    placed.push({ ...w, id: w.id ?? uuidv4(), layout });
  }

  return placed;
}

/**
 * Estimates how many grid rows a Text widget's content actually needs, so
 * the box can grow to fit what was typed instead of clipping it or making
 * it scroll internally. Deliberately generous (rounds line-wrap estimates
 * up) — better to leave a little empty space than to under-size and hide
 * text again.
 */
export function estimateTextRows(text: string, fontSize: number, widthGridUnits: number): number {
  const widthPx = Math.max(widthGridUnits, 4) * (CANVAS_WIDTH / GRID_COLS);
  const lineHeightPx = fontSize * 1.35;
  const avgCharWidthPx = fontSize * 0.55;
  const charsPerLine = Math.max(1, Math.floor((widthPx - 16) / avgCharWidthPx));

  const paragraphs = (text || "").split("\n");
  const totalLines = paragraphs.reduce(
    (sum, para) => sum + (para.length === 0 ? 1 : Math.ceil(para.length / charsPerLine)),
    0
  );

  const neededPx = totalLines * lineHeightPx + 16; // small vertical padding
  const neededRows = Math.ceil(neededPx / ROW_HEIGHT);

  return Math.min(Math.max(neededRows, 4), GRID_ROWS - TOP_MARGIN_ROWS);
}