const express = require("express");
const {
  signup,
  verifyEmail,
  forgetPassword,
  resetPassword,
  login,
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

// login route
router.post("/login", login);

module.exports = router;
