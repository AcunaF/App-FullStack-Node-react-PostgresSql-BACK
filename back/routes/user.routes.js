const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");

router.get("/", UserController.findAllUsers);
router.put("/:id", UserController.updateUserById);

module.exports = router;
