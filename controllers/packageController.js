const Package = require("../models/packageSchema");

const packageController = {
  // ✅ Create
  createPackage: async (req, res) => {
    try {
      const pkg = new Package(req.body);
      await pkg.save();
      console.info("Package created | ID:", pkg._id);
      res.status(201).json(pkg);
    } catch (error) {
      console.error("Error creating package:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get All with Pagination
  getAllPackages: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const [packages, totalPackages] = await Promise.all([
        Package.find().skip(skip).limit(limit),
        Package.countDocuments(),
      ]);

      // console.info(`Fetched ${packages.length} packages (page ${page})`);

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalPackages / limit),
        totalPackages,
        data: packages,
      });
    } catch (error) {
      console.error("Error fetching packages:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get By ID
  getPackageById: async (req, res) => {
    try {
      const { id } = req.params;
      const pkg = await Package.findById(id);
      if (!pkg) {
        console.warn("Package not found | ID:", id);
        return res.status(404).json({ error: "Package not found" });
      }
      console.info("Package retrieved | ID:", id);
      res.status(200).json(pkg);
    } catch (error) {
      console.error("Error fetching package:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Update By ID
  updatePackageById: async (req, res) => {
    try {
      const { id } = req.params;
      const pkg = await Package.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!pkg) {
        console.warn("Package not found for update | ID:", id);
        return res.status(404).json({ error: "Package not found" });
      }
      console.info("Package updated | ID:", id);
      res.status(200).json(pkg);
    } catch (error) {
      console.error("Error updating package:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Delete By ID
  deletePackageById: async (req, res) => {
    try {
      const { id } = req.params;
      const pkg = await Package.findByIdAndDelete(id);
      if (!pkg) {
        console.warn("Package not found for deletion | ID:", id);
        return res.status(404).json({ error: "Package not found" });
      }
      console.info("Package deleted | ID:", id);
      res
        .status(200)
        .json({ message: "Package deleted successfully", package: pkg });
    } catch (error) {
      console.error("Error deleting package:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = packageController;
