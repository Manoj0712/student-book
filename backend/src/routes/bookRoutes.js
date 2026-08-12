const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/create", createBook);

router.get("/index", getBooks);

router.get("/:id", getBookById);

router.put("/update/:id", updateBook);

router.delete("/delete/:id", deleteBook);

module.exports = router;
