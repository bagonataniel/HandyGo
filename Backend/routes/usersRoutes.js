const express = require("express");
const authController = require("../controllers/usersController");
const router = express.Router();
const auth = require("../middleware/auth");


router.get("/:id", auth, authController.getUserById)
router.put("/update", auth, authController.updateUser)
router.get("/bookings", auth, authController.getUserBookings)
router.get("/:id/services", auth, authController.getUserServices)

module.exports = router