import { useState } from "react";
import type { Layout } from "react-grid-layout";
import type { BookPage, Widget, WidgetType } from "../types/book";
import { useBooksQuery, useCreateBookMutation, useUpdateBookMutation } from "./useBooks";
import { bookApi } from "../api/bookApi";
import {
  createDefaultWidget,
  normalizeWidgets,
  getPageCount,
  estimateTextRows,
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from "../utils/grid";

const EMPTY_BOOK: BookPage = {
  pageTitle: "",
  page_size_X: String(CANVAS_WIDTH),
  page_size_Y: String(CANVAS_HEIGHT),
  orientation: "portrait",
  widgets: [],
};

const useEditorPage = () => {
  const [book, setBook] = useState<BookPage>(EMPTY_BOOK);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [manualPageCount, setManualPageCount] = useState(1);

  const { data: bookList = [] } = useBooksQuery();

  const createMutation = useCreateBookMutation();
  const updateMutation = useUpdateBookMutation();
  const isSaving: boolean = createMutation.isPending || updateMutation.isPending;
  const pageCount = Math.max(getPageCount(book.widgets), manualPageCount);
  const selectedWidget = book.widgets.find((w) => w.id === selectedId) || null;

  function updateWidgets(updater: (widgets: Widget[]) => Widget[]) {
    setBook((prev) => ({ ...prev, widgets: updater(prev.widgets) }));
  }

  function handleAddWidget(type: WidgetType) {
    const widget = createDefaultWidget(type, book.widgets);
    updateWidgets((ws) => [...ws, widget]);
    setSelectedId(widget.id);
  }

  function handleLayoutChange(page: number, layout: Layout[]) {
    updateWidgets((ws) =>
      ws.map((w) => {
        if ((w?.layout?.page ?? 0) !== page) return w;
        const l = layout.find((item) => item.i === w.id);
        return l ? {
          ...w, layout: {
            ...w?.layout,
            x: l?.x,
            y: l?.y,
            w: l?.w,
            h: l?.h
          }
        } : w;
      })
    );
  }

  function handleAddPage() {
    setManualPageCount((n) => Math.max(n, getPageCount(book.widgets) + 1));
  }

  function handleChangeProps(id: string, props: Widget["props"]) {
    updateWidgets((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        if (w.type !== "Text") return { ...w, props };

        // Grow the box to fit what was typed instead of clipping it or
        // making it scroll internally — never shrinks automatically (so
        // deleting text doesn't yank the box smaller out from under you);
        // resize it down manually if you want it tighter.
        const textProps = props as { text: string; fontSize: number };
        const neededRows = estimateTextRows(textProps.text, textProps.fontSize, w.layout.w);
        const h = Math.max(w.layout.h, neededRows);

        return { ...w, props, layout: { ...w.layout, h } };
      })
    );
  }

  function handleDelete(id: string) {
    updateWidgets((ws) => ws.filter((w) => w.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function handleReorder(id: string, direction: "front" | "back") {
    updateWidgets((ws) => {
      const target = ws.find((w) => w.id === id);
      if (!target) return ws;
      const rest = ws.filter((w) => w.id !== id);
      return direction === "front" ? [...rest, target] : [target, ...rest];
    });
  }

  async function handleSave() {
    if (!book.pageTitle.trim()) {
      setStatusMessage("Add a page title before saving.");
      return;
    }
    setStatusMessage(null);
    try {
      const saved = book._id
        ? await updateMutation.mutateAsync({ id: book._id, book })
        : await createMutation.mutateAsync(book);
      setBook(saved);
      setStatusMessage(`Saved "${saved.pageTitle}" ✓`);
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setTimeout(() => setStatusMessage(null), 4000);
    }
  }

  async function handleOpenBook(id: string) {
    try {
      const loaded = await bookApi.getById(id);
      setBook({ ...loaded, widgets: normalizeWidgets(loaded.widgets) });
      setSelectedId(null);
      setIsPreview(false);
      setManualPageCount(1);
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : "Failed to load book");
    }
  }

  function handleNew() {
    setBook(EMPTY_BOOK);
    setSelectedId(null);
    setIsPreview(false);
    setStatusMessage(null);
    setManualPageCount(1);
  }

  return {
    book,
    setBook,
    selectedId,
    setSelectedId,
    isPreview,
    isSaving,
    bookList,
    pageCount,
    selectedWidget,
    handleAddWidget,
    setIsPreview,
    statusMessage,
    setStatusMessage,
    manualPageCount,
    setManualPageCount,
    handleLayoutChange,
    handleAddPage,
    handleChangeProps,
    handleDelete,
    handleReorder,
    handleSave,
    handleOpenBook,
    handleNew,
  };
}

export default useEditorPage;