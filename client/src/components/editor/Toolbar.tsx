import type { Orientation, ToolbarProps } from "../../types/book";
import { WidgetButtons } from "./WidgetButtons";

export default function Toolbar({
  pageTitle,
  orientation,
  isPreview,
  isSaving,
  isEditingExisting,
  bookList,
  statusMessage,
  onTitleChange,
  onOrientationChange,
  onAddWidget,
  onTogglePreview,
  onSave,
  onNew,
  onOpenBook,
}: ToolbarProps) {

  return (
    <div className="border-b border-line bg-white">
      <div className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-2.5">
        <input
          value={pageTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled lesson"
          disabled={isPreview}
          className="min-w-0 flex-1 sm:flex-none sm:w-56 px-2.5 py-1.5 rounded-md border border-line text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-surface disabled:text-ink/50"
        />

        <select
          value={orientation}
          onChange={(e) => onOrientationChange(e.target.value as Orientation)}
          disabled={isPreview}
          className="px-2 py-1.5 rounded-md border border-line text-sm disabled:bg-surface disabled:text-ink/50"
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>

        <select
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) onOpenBook(e.target.value);
            e.target.value = "";
          }}
          className="px-2 py-1.5 rounded-md border border-line text-sm text-ink/70 max-w-[9rem] sm:max-w-none"
        >
          <option value="" disabled>
            Open saved page…
          </option>
          {bookList.map((b) => (
            <option key={b._id} value={b._id}>
              {b.pageTitle}
            </option>
          ))}
        </select>
        <div className="ml-auto flex items-center gap-2">
          {statusMessage && <span className="text-xs text-ink/50 hidden sm:inline">{statusMessage}</span>}

          <button
            onClick={onNew}
            className="px-3 py-1.5 rounded-md text-sm font-medium text-ink/70 hover:bg-surface border border-line"
          >
            New
          </button>

          <button
            onClick={onTogglePreview}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border ${isPreview ? "bg-ink text-white border-ink" : "text-ink/70 hover:bg-surface border-line"
              }`}
          >
            {isPreview ? "Exit Preview" : "Preview"}
          </button>

          <button
            onClick={onSave}
            disabled={isSaving || isPreview}
            className="px-3.5 py-1.5 rounded-md text-sm font-semibold bg-accent text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {isSaving ? "Saving…" : isEditingExisting ? "Update" : "Save"}
          </button>
        </div>
      </div>
      {!isPreview && <WidgetButtons onAddWidget={onAddWidget} />}
    </div>
  );
}
