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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const [bookings, totalBookings] = await Promise.all([
        Booking.find().skip(skip).limit(limit).populate("package_id"),
        Booking.countDocuments(),
      ]);

      console.info(`Fetched ${bookings.length} bookings (page ${page})`);

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalBookings / limit),
        totalBookings,
        data: bookings,
      });
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
      res.status(200).json({ message: "Booking deleted successfully", booking });
    } catch (error) {
      console.error("Error deleting booking:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = bookingController;
