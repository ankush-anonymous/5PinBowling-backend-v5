const express = require("express");
const router = express.Router();
const businessHoursController = require("../controllers/businessHoursController");

router.post("/createBusinessHour", businessHoursController.createBusinessHour);
router.get("/getAllBusinessHours", businessHoursController.getAllBusinessHours);
router.get("/getBusinessHourById/:id", businessHoursController.getBusinessHourById);
router.put("/updateBusinessHourById/:id", businessHoursController.updateBusinessHourById);
router.delete("/deleteBusinessHourById/:id", businessHoursController.deleteBusinessHourById);

module.exports = router;
