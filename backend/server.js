require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const bookRoutes = require("./src/routes/bookRoutes");

const app = express();

// Middleware
app.use(cors()); // allows the React Editor/Reader apps (different port) to call this API
app.use(express.json({ limit: "10mb" })); // parse JSON bodies; raised limit for base64 images if needed

connectDB();

// Health check
app.get("/", (req, res) => {
  res.send("E-Digital Books API is running...");
});

// Routes
app.use("/api/books", bookRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (catches anything thrown outside try/catch)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
