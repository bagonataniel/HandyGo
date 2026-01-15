const express = require("express");
const serviceController = require("../controllers/serviceController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, serviceController.addService)
router.get("/filter/:lat/:lon", auth, serviceController.filterServices)
router.get("/", auth, serviceController.getAllServices)
router.get("/my-services", auth, serviceController.getMyServices)
router.get("/:id", auth, serviceController.getServiceById)
router.put("/update/:id", auth, serviceController.updateService)
router.delete("/delete/:id", auth, serviceController.deleteService)
router.post("/:id/review", auth, serviceController.createReview)

module.exports = router