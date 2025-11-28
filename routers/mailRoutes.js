const express = require("express");
const router = express.Router();
const { contactUs } = require("../controllers/mailController");
const verifyToken = require("../middleware/JWTverifyToken");

router.use(verifyToken);

router.post("/contact", contactUs);

module.exports = router;
