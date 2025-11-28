const BusinessHour = require("../models/businessHoursSchema");

const businessHoursController = {
  // ✅ Create
  createBusinessHour: async (req, res) => {
    try {
      const entry = new BusinessHour(req.body);
      await entry.save();
      console.info("Business hour created | ID:", entry._id);
      res.status(201).json(entry);
    } catch (error) {
      console.error("Error creating business hour:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get All
  getAllBusinessHours: async (req, res) => {
    try {
      const hours = await BusinessHour.find();
      // console.info(`Fetched ${hours.length} business hours`);
      res.status(200).json({ data: hours });
    } catch (error) {
      console.error("Error fetching business hours:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get By ID
  getBusinessHourById: async (req, res) => {
    try {
      const { id } = req.params;
      const entry = await BusinessHour.findById(id);
      if (!entry) {
        console.warn("Business hour not found | ID:", id);
        return res.status(404).json({ error: "Business hour not found" });
      }
      console.info("Business hour retrieved | ID:", id);
      res.status(200).json(entry);
    } catch (error) {
      console.error("Error fetching business hour:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Update By ID
  updateBusinessHourById: async (req, res) => {
    try {
      const { id } = req.params;
      const entry = await BusinessHour.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!entry) {
        console.warn("Business hour not found for update | ID:", id);
        return res.status(404).json({ error: "Business hour not found" });
      }
      console.info("Business hour updated | ID:", id);
      res.status(200).json(entry);
    } catch (error) {
      console.error("Error updating business hour:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Delete By ID
  deleteBusinessHourById: async (req, res) => {
    try {
      const { id } = req.params;
      const entry = await BusinessHour.findByIdAndDelete(id);
      if (!entry) {
        console.warn("Business hour not found for deletion | ID:", id);
        return res.status(404).json({ error: "Business hour not found" });
      }
      console.info("Business hour deleted | ID:", id);
      res.status(200).json({ message: "Business hour deleted", entry });
    } catch (error) {
      console.error("Error deleting business hour:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = businessHoursController;
