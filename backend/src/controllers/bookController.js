const Book = require("../models/Book");

// @desc    Create a new book/page (Editor "Save/Export" action)
// @route   POST /api/books
const createBook = async (req, res) => {
  try {
    const { pageTitle, page_size_X, page_size_Y, orientation, widgets } = req.body;

    if (!pageTitle) {
      return res.status(400).json({ message: "pageTitle is required" });
    }

    const book = await Book.create({
      pageTitle,
      page_size_X,
      page_size_Y,
      orientation,
      widgets,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to create book", error: error.message });
  }
};

// @desc    Get all books (Reader "Load Book" dropdown list)
// @route   GET /api/books
const getBooks = async (req, res) => {
  try {
    // Only send lightweight fields for the list view; full widgets fetched on demand
    const books = await Book.find().select("pageTitle orientation createdAt updatedAt").sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

// @desc    Get a single book's full JSON (Reader renders this)
// @route   GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid book id" });
    }
    res.status(500).json({ message: "Failed to fetch book", error: error.message });
  }
};

// @desc    Update/edit an existing book/page (Editor re-save)
// @route   PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};

// @desc    Delete a book/page
// @route   DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
