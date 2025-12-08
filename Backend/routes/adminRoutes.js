const express = require("express");
const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

router.post("/login", adminController.adminLogin);
router.post("/register", adminAuth, adminController.adminRegister);
router.get("/services", adminAuth, adminController.getAllServices);
router.get("/services/pending", adminAuth, adminController.getPendingServices);
router.post("/services/:id/approve", adminAuth, adminController.approveService);
router.post("/services/:id/reject", adminAuth, adminController.rejectService);
router.get("/users", adminAuth, adminController.getAllUsers);

module.exports = router;