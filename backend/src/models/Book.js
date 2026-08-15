const mongoose = require("mongoose");


const widgetLayoutSchema = new mongoose.Schema(
  {
    page: { type: Number, default: 0 },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    w: { type: Number, required: true },
    h: { type: Number, required: true },
  },
  { _id: false }
);


const widgetSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["Text", "Image", "Video", "Audio", "3DObject", "LiveData"],
    },
    props: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    layout: {
      type: widgetLayoutSchema,
      required: false,
    },
  },
  { _id: false }
);

const bookSchema = new mongoose.Schema(
  {
    pageTitle: {
      type: String,
      required: true,
      trim: true,
    },
    page_size_X: {
      type: String,
      default: "800",
    },
    page_size_Y: {
      type: String,
      default: "1000",
    },
    orientation: {
      type: String,
      enum: ["portrait", "landscape"],
      default: "portrait",
    },
    widgets: {
      type: [widgetSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
