import { useCallback, useState } from "react";
import type { BookPage } from "../types/book";
import { bookApi } from "../api/bookApi";
import { useBooksQuery } from "./useBooks";
import { normalizeWidgets, CANVAS_WIDTH, CANVAS_HEIGHT } from "../utils/grid";

const useReaderPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [book, setBook] = useState<BookPage | null>(null);
  const [isLoadingBook, setIsLoadingBook] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: bookList = [], isLoading: isListLoading } = useBooksQuery();

  const loadSaved = useCallback(async (id: string) => {
    setIsLoadingBook(true);
    setError(null);
    try {
      const loaded = await bookApi.getById(id);
      setBook({ ...loaded, widgets: normalizeWidgets(loaded.widgets) });
      setSelectedId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load book");
    } finally {
      setIsLoadingBook(false);
    }
  }, []);

  function loadFromFile(file: File) {
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const normalized: BookPage = {
          pageTitle: parsed.pageTitle || "Untitled",
          page_size_X: parsed.page_size_X || String(CANVAS_WIDTH),
          page_size_Y: parsed.page_size_Y || String(CANVAS_HEIGHT),
          orientation: parsed.orientation === "landscape" ? "landscape" : "portrait",
          widgets: normalizeWidgets(parsed.widgets || []),
        };
        setBook(normalized);
        setSelectedId(null);
      } catch {
        setError("That file isn't valid JSON in the expected book format.");
      }
    };
    reader.readAsText(file);
  }

  return {
    selectedId,
    book,
    isLoadingBook,
    error,
    bookList,
    isListLoading,
    loadSaved,
    loadFromFile
  };
}

export default useReaderPage;
