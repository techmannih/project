const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 12,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Adding an index to userId for faster querying
imageSchema.index({ userId: 1 });

module.exports = mongoose.model("Image", imageSchema);
