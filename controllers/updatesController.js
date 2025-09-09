const Update = require("../models/updatesSchema");

const updatesController = {
  // ✅ Create
  createUpdate: async (req, res) => {
    try {
      const update = new Update(req.body);
      await update.save();
      res.status(201).json(update);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get All with Pagination + Filter
  getAllUpdates: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const filter = {};
      if (req.query.isArchived !== undefined) {
        filter.isArchived = req.query.isArchived === "true";
      }

      const [updates, totalUpdates] = await Promise.all([
        Update.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
        Update.countDocuments(filter),
      ]);

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalUpdates / limit),
        totalUpdates,
        data: updates,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get By ID
  getUpdateById: async (req, res) => {
    try {
      const update = await Update.findById(req.params.id);
      if (!update) return res.status(404).json({ error: "Update not found" });
      res.status(200).json(update);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Update By ID
  updateUpdateById: async (req, res) => {
    try {
      const update = await Update.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!update) return res.status(404).json({ error: "Update not found" });
      res.status(200).json(update);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Delete By ID
  deleteUpdateById: async (req, res) => {
    try {
      const update = await Update.findByIdAndDelete(req.params.id);
      if (!update) return res.status(404).json({ error: "Update not found" });
      res.status(200).json({ message: "Update deleted successfully", update });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = updatesController;
