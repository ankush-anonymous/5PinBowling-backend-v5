const mongoose = require("mongoose");

// Optional: keep Mongoose in a sane default mode
mongoose.set("strictQuery", true);

const connectDB = async (url) => {
  if (!url) {
    console.error("MongoDB connection error: DB_URI is not set");
    process.exit(1);
  }

  try {
    // With Mongoose v6+, no need for useNewUrlParser/useUnifiedTopology
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
