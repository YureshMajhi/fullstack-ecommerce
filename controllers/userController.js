// models
const User = require("../models/userModel");
const Token = require("../models/tokenModel");

const { emailSender } = require("../utils/emailSender");

// functions
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

// signup method
const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    // create verification token
    const verifyToken = await Token.create({
      token: crypto.randomBytes(16).toString("hex"),
      userId: user._id,
    });
    if (!verifyToken) {
      return res.status(400).json({ error: "Error generating token" });
    }

    const url = `http://localhost:${process.env.PORT}/api/user/verifyemail/${verifyToken.token}`;

    // send email with verification token
    emailSender({
      from: "noreply@something.com",
      to: email,
      subject: "Verification Email",
      text: "Please click on the following to verify your account " + url,
      html: `<a href="${url}"><button>Click to verify</button></a>`,
    });
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// verifiy email
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  // verify if token is valid
  const verifyToken = await Token.findOne({ token });
  if (!verifyToken) {
    return res
      .status(400)
      .json({ error: "Invalid token or token may have expired" });
  }

  // verify user email
  try {
    const user = await User.findOne({ _id: verifyToken.userId });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.is_Verified) {
      return res.status(400).json({
        error: "User is already verified. Please login to continue",
      });
    }

    user.is_Verified = true;
    await user.save();

    res.status(200).json({ msg: "User successfully verified" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// resent verify email
const resentVerify = async (req, res) => {
  const { email, password } = req.body;

  // check email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User doesnot exist" });
  }

  // check if password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  // check if user is verified
  if (user.is_Verified) {
    return res
      .status(400)
      .json({ error: "User already verified. Please login to continue" });
  }

  // generate token
  const verifyToken = await Token.create({
    token: crypto.randomBytes(16).toString("hex"),
    userId: user._id,
  });
  if (!verifyToken) {
    return res.status(400).json({ error: "Error generating token" });
  }

  // send email with verification token
  const url = `http://localhost:${process.env.PORT}/api/user/verifyemail/${verifyToken.token}`;
  emailSender({
    from: "noreply@something.com",
    to: email,
    subject: "Verification Email",
    text: "Please click on the following to verify your account " + url,
    html: `<a href="${url}"><button>Click to verify</button></a>`,
  });
};

// forget password
const forgetPassword = async (req, res) => {
  const { email } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Email is not registered" });
  }

  // generate token for user
  const forgetToken = await Token.create({
    token: crypto.randomBytes(16).toString("hex"),
    userId: user._id,
  });
  if (!forgetToken) {
    return res.status(400).json({ error: "Error generating forgetToken" });
  }

  // send email with url
  const url = `http://localhost:${process.env.PORT}/api/user/resetpassword/${forgetToken.token}`;
  emailSender({
    from: "noreply@something.com",
    to: email,
    subject: "Reset your password",
    text: "Please click on the following to reset your password " + url,
    html: `<a href="${url}"><button>Click to verify</button></a>`,
  });

  return res
    .status(200)
    .json({ msg: "Password reset link has been sent to your email" });
};

// reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // verify the token
  const forgetToken = await Token.findOne({ token });
  if (!forgetToken) {
    return res
      .status(400)
      .json({ error: "Invalid token or token may have expired" });
  }

  // check user
  const user = await User.findOne({ _id: forgetToken.userId });
  if (!user) {
    return res.status(400).json({ error: "User doesnot exist" });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  user.password = hash;
  await user.save();

  res.status(200).json({ msg: "Password reset successfully" });
};

// login method
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const { _id, username, role } = user;

    // generate token
    const token = jwt.sign(
      { userId: user._id, email, username, role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // set info in cookie
    res.cookie("myCookie", token, { expiresIn: Date.now() + 86400 });

    res.status(200).json({ token, user: { _id, username, email, role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// logout method
const logout = async (req, res) => {
  const response = await res.clearCookie("myCookie");
  if (!response) {
    return res.status(400).json({ error: "Error signing out" });
  }

  res.status(200).json({ msg: "Successfully logged out" });
};

// authentication
const requireAuth = expressjwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET_KEY,
});

module.exports = {
  signup,
  verifyEmail,
  forgetPassword,
  resetPassword,
  login,
  logout,
  resentVerify,
  requireAuth,
};
