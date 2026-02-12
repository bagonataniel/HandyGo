const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
const auth = require("../middleware/auth");


router.get("/:id", auth, usersController.getUserById)
router.put("/update", auth, usersController.updateUser)
router.delete("/removeaccount", auth, usersController.deleteUser)
router.get("/:id/services", auth, usersController.getUserServices)

module.exports = router