import BookLoader from "../components/reader/BookLoader";
import ReaderCanvas from "../components/reader/ReaderCanvas";
import useReaderPage from "../hooks/useReaderPage";

export default function ReaderPage() {

  const {
    selectedId,
    book,
    isLoadingBook,
    error,
    bookList,
    isListLoading,
    loadSaved,
    loadFromFile
  } = useReaderPage();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <BookLoader
        bookList={bookList}
        selectedId={selectedId}
        isLoading={isLoadingBook || isListLoading}
        onSelectSaved={loadSaved}
        onUploadJson={loadFromFile}
      />

      <div className="flex-1 overflow-y-auto thin-scroll px-3 sm:px-6 py-6">
        {error && (
          <div className="max-w-2xl mx-auto mb-4 px-3 py-2 rounded-md bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        {book ? (
          <>
            <h1 className="max-w-2xl mx-auto mb-3 text-lg font-display font-semibold">{book.pageTitle}</h1>
            <ReaderCanvas book={book} />
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-center text-sm text-ink/40 px-6">
            Choose a saved book or upload a JSON file to read it here.
          </div>
        )}
      </div>
    </div>
  );
}
