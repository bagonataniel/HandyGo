const express = require("express");
const serviceController = require("../controllers/serviceController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, serviceController.addService)
router.get("/", auth, serviceController.getAllServices)
router.get("/:id", auth, serviceController.getServiceById)
router.put("/update/:id", auth, serviceController.updateService)
router.delete("/delete/:id", serviceController.deleteService)
router.post("/:id/review", serviceController.createReview)

module.exports = router