const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.route("/create").post(createBook);

router.route("/index").get(getBooks);

router.get("/:id", getBookById);

router.put("/update/:id", updateBook);

router.delete("/delete/:id", deleteBook);

module.exports = router;
