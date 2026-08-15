import { useRef } from "react";
import type { BookSummary } from "../../types/book";
import { map } from "lodash";

interface Props {
  bookList: BookSummary[];
  selectedId: string | null;
  isLoading: boolean;
  onSelectSaved: (id: string) => void;
  onUploadJson: (file: File) => void;
}

export default function BookLoader({ bookList, selectedId, isLoading, onSelectSaved, onUploadJson }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-3 border-b border-line bg-white">
      <label className="text-xs font-medium text-ink/50 uppercase tracking-wide shrink-0">Load Book / JSON</label>

      <select
        value={selectedId ?? ""}
        onChange={(e) => e.target.value && onSelectSaved(e.target.value)}
        className="flex-1 min-w-[10rem] px-2.5 py-1.5 rounded-md border border-line text-sm"
      >
        <option value="" disabled>
          {bookList.length ? "Choose a saved book…" : "No saved books yet"}
        </option>
        {map(bookList, (b) => (
          <option key={b._id} value={b._id}>
            {b.pageTitle}
          </option>
        ))}
      </select>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-3 py-1.5 rounded-md border border-line text-sm font-medium text-ink/70 hover:bg-surface shrink-0"
      >
        Upload JSON…
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUploadJson(file);
          e.target.value = "";
        }}
      />

      {isLoading && <span className="text-xs text-ink/40 shrink-0">Loading…</span>}
    </div>
  );
}
