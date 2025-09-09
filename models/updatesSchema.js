const mongoose = require("mongoose");

const UpdatesSchema = new mongoose.Schema(
  {
    title: { type: String, maxlength: 150 },
    subtitle: { type: String, maxlength: 250 },
    body: { type: String },
    image_url: { type: String },
    isArchived: { type: Boolean, default: false },
    author: { type: String, maxlength: 100 },
    dateOfCreation: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Update = mongoose.model("Update", UpdatesSchema);

module.exports = Update;
