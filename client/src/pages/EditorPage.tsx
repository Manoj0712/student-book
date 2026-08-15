import Toolbar from "../components/editor/Toolbar";
import Canvas from "../components/editor/Canvas";
import type { Orientation } from "../types/book";
import PropertiesPanel from "../components/editor/PropertiesPanel";
import useEditorPage from "../hooks/useEditorPage";

export default function EditorPage() {
  const {
    book,
    selectedId,
    isPreview,
    isSaving,
    statusMessage,
    bookList,
    pageCount,
    selectedWidget,
    setBook,
    setSelectedId,
    setIsPreview,
    handleAddWidget,
    handleLayoutChange,
    handleAddPage,
    handleChangeProps,
    handleDelete,
    handleReorder,
    handleSave,
    handleNew,
    handleOpenBook
  } = useEditorPage();


  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Toolbar
        pageTitle={book.pageTitle}
        orientation={book.orientation}
        isPreview={isPreview}
        isSaving={isSaving}
        isEditingExisting={Boolean(book._id)}
        bookList={bookList}
        statusMessage={statusMessage}
        onTitleChange={(pageTitle) => setBook((b) => ({ ...b, pageTitle }))}
        onOrientationChange={(orientation: Orientation) => setBook((b) => ({ ...b, orientation }))}
        onAddWidget={handleAddWidget}
        onTogglePreview={() => setIsPreview((v) => !v)}
        onSave={handleSave}
        onNew={handleNew}
        onOpenBook={handleOpenBook}
      />

      <div className="flex-1 flex min-h-0">
        <Canvas
          widgets={book.widgets}
          pageCountOverride={pageCount}
          selectedId={selectedId}
          isPreview={isPreview}
          onSelect={setSelectedId}
          onLayoutChange={handleLayoutChange}
          onDelete={handleDelete}
          onAddPage={handleAddPage}
        />
        {!isPreview && (
          <PropertiesPanel
            widget={selectedWidget}
            onChangeProps={handleChangeProps}
            onDelete={handleDelete}
            onReorder={handleReorder}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}
