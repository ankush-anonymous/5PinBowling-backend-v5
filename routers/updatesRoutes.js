const express = require("express");
const router = express.Router();
const updatesController = require("../controllers/updatesController");

router.post("/createUpdate", updatesController.createUpdate);
router.get("/getAllUpdates", updatesController.getAllUpdates);
router.get("/getUpdateById/:id", updatesController.getUpdateById);
router.put("/updateUpdateById/:id", updatesController.updateUpdateById);
router.delete("/deleteUpdateById/:id", updatesController.deleteUpdateById);

module.exports = router;
