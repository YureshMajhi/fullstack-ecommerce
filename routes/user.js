const express = require("express");
const { signup, verifyEmail } = require("../controllers/userController");

const router = express.Router();

// signup route
router.post("/signup", signup);

// verify email
router.get("/verifyemail/:token", verifyEmail);

module.exports = router;
