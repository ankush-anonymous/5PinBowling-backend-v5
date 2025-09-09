const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    pageName: { type: String, maxlength: 100 },
    img_url: { type: String },
    Title: { type: String, maxlength: 150 },
    subtitle: { type: String, maxlength: 250 },
    description: { type: String },
    Cost: { type: mongoose.Decimal128 },
    no_of_person: { type: Number },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
