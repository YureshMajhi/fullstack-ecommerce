const express = require("express");
const {
  signup,
  verifyEmail,
  forgetPassword,
  resetPassword,
  login,
  logout,
  resentVerify,
} = require("../controllers/userController");

const router = express.Router();

// signup route
router.post("/signup", signup);

// verify email
router.get("/verifyemail/:token", verifyEmail);

// resent verify email
router.post("/resendverifyemail", resentVerify);

// forget password
router.post("/forgetpassword", forgetPassword);

// reset password
router.post("/resetpassword/:token", resetPassword);

// login route
router.post("/login", login);

// signout route
router.get("/signout", logout);

module.exports = router;
