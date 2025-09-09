const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

router.post("/createPackage", packageController.createPackage);
router.get("/getAllPackages", packageController.getAllPackages);
router.get("/getPackageById/:id", packageController.getPackageById);
router.put("/updatePackageById/:id", packageController.updatePackageById);
router.delete("/deletePackageById/:id", packageController.deletePackageById);

module.exports = router;
