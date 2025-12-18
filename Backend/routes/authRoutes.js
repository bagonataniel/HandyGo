const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/verify/:token", authController.verify)
router.get("/extend-verification", authController.extendVerification)

module.exports = router