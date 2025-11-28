const app = require("./app");
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5001;

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB(process.env.DB_URI);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
