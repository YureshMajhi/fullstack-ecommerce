const express = require("express");
const {
  signup,
  verifyEmail,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

// signup route
router.post("/signup", signup);

// verify email
router.get("/verifyemail/:token", verifyEmail);

// forget password
router.post("/forgetpassword", forgetPassword);

// reset password
router.post("/resetpassword/:token", resetPassword);

module.exports = router;
