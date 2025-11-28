const express = require("express");
const router = express.Router();
const slotbookingController = require("../controllers/slotBookingController");
const verifyToken = require("../middleware/JWTverifyToken");

router.use(verifyToken);

router.post("/createBooking", slotbookingController.createBooking);
router.get("/getAllBookings", slotbookingController.getAllBookings);
router.get("/getBookingById/:id", slotbookingController.getBookingById);
router.put("/updateBookingById/:id", slotbookingController.updateBookingById);
router.delete("/deleteBookingById/:id", slotbookingController.deleteBookingById);

module.exports = router;
