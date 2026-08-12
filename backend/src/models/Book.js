const mongoose = require("mongoose");

// Each widget has a "type" (Text, Image, Video, Audio, 3DObject, LiveData)
// and a "props" object whose shape differs per type — so props is stored
// as Mixed/flexible JSON rather than a rigid sub-schema.
const widgetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Text", "Image", "Video", "Audio", "3DObject", "LiveData"],
    },
    props: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false } // keep widget objects lightweight; array order = display order
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
