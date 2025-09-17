const express = require("express");
const authController = require("../controllers/usersController");
const router = express.Router();
const auth = require("../middleware/auth");


router.get("/:id", auth, authController.getUserById)
// router.patch("/:id", auth, authController.updateUser)
// router.get("/:id/bookings", auth, authController.getUserBookings)
// router.get("/:id/services", auth, authController.getUserServices)

module.exports = router