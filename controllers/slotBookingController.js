const Booking = require("../models/slotBookingSchema");

const bookingController = {
  // ✅ Create
  createBooking: async (req, res) => {
    try {
      const booking = new Booking(req.body);
      await booking.save();
      console.info("Booking created | ID:", booking._id);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get All with Pagination
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find().populate("package_id").sort({ date: 1 });

      const groupedByDate = bookings.reduce((acc, booking) => {
        const date = booking.date.toISOString().split("T")[0]; // Get YYYY-MM-DD
        if (!acc[date]) {
          acc[date] = {
            date: date,
            bookings_details: [],
          };
        }
        acc[date].bookings_details.push(booking);
        return acc;
      }, {});

      const response = Object.values(groupedByDate);

      res.status(200).json({ data: response });
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get By ID
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findById(id).populate("package_id");
      if (!booking) {
        console.warn("Booking not found | ID:", id);
        return res.status(404).json({ error: "Booking not found" });
      }
      console.info("Booking retrieved | ID:", id);
      res.status(200).json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Update By ID
  updateBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      }).populate("package_id");

      if (!booking) {
        console.warn("Booking not found for update | ID:", id);
        return res.status(404).json({ error: "Booking not found" });
      }
      console.info("Booking updated | ID:", id);
      res.status(200).json(booking);
    } catch (error) {
      console.error("Error updating booking:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Delete By ID
  deleteBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findByIdAndDelete(id);
      if (!booking) {
        console.warn("Booking not found for deletion | ID:", id);
        return res.status(404).json({ error: "Booking not found" });
      }
      console.info("Booking deleted | ID:", id);
      res
        .status(200)
        .json({ message: "Booking deleted successfully", booking });
    } catch (error) {
      console.error("Error deleting booking:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = bookingController;
