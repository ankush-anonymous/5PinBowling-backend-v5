const express = require("express");
const connectDB = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 5001;
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const slotBookingRoutes = require("./routers/slotBookingRoutes");
const packageRoutes = require("./routers/packageRoutes");
const businessHoursRoutes = require("./routers/businessHoursRoutes");
const updatesRoutes = require("./routers/updatesRoutes");
const mailRoutes = require("./routers/mailRoutes");
const userRoutes = require("./routers/userRoutes");

// test-GET route
app.get("/", (req, res) => {
  res.send("5PinBowling Node.js Server is Running!");
});

// Routes
app.use("/api/v1/slotbooking", slotBookingRoutes);
app.use("/api/v1/package", packageRoutes);
app.use("/api/v1/businessHours", businessHoursRoutes);
app.use("/api/v1/updates", updatesRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/user", userRoutes);

module.exports = app;
