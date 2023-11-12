const User = require("../models/userModel");
const { emailSender } = require("../utils/emailSender");
const jwt = require("jsonwebtoken");

// signup method
const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    // create verification token
    const verifyToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_VERIFY,
      { expiresIn: "1d" }
    );

    const url = `http://localhost:${process.env.PORT}/api/user/verifyemail/${verifyToken}`;

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
  let userId;

  // verify if token is valid
  jwt.verify(token, process.env.JWT_SECRET_VERIFY, (error, decoded) => {
    if (error) {
      return res
        .status(400)
        .json({ error: "Invalid token or token may have expired" });
    }

    userId = decoded.userId;
  });

  // verify user email
  try {
    const user = await User.findOne({ _id: userId });
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

    res.status(400).json({ msg: "User successfully verified" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, verifyEmail };
