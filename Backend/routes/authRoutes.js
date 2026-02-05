const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/verify/:token", authController.verify)
router.post("/extend-verification", authController.extendVerification)
router.get("/check-verification", authController.checkVerification)

module.exports = router