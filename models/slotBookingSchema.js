const mongoose = require("mongoose");

const SlotBookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, maxlength: 100 },
    email: { type: String, maxlength: 100 },
    phone: { type: String, maxlength: 20 },
    date: { type: Date },
    startTime: { type: String }, // store as string "HH:mm:ss"
    endTime: { type: String },
    noOfPlayers: { type: Number },
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    lane_no: { type: Number },
    book_status: { type: String, maxlength: 50 },
    pay_status: { type: String, maxlength: 50 },
    note: { type: String },
    pizza_quantity: { type: String },
    pizza_type: { type: String },
    shoe_size: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", SlotBookingSchema);

module.exports = Booking;
