const express = require("express");
const serviceController = require("../controllers/bookingController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, serviceController.createBooking);
router.get("/:id", auth, serviceController.getBookingDetails);
router.get("/bookings/client", auth, serviceController.getBookingsAsClient);
router.get("/bookings/worker", auth, serviceController.getBookingsAsWorker);
router.put("/:id/status", auth, serviceController.updateBookingStatus);

module.exports = router