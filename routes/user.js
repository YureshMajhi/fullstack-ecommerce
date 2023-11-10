const express = require("express");
const { signup } = require("../controllers/userController");

const router = express.Router();

// signup route
router.post("/signup", signup);

module.exports = router;
