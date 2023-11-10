const User = require("../models/userModel");
const { emailSender } = require("../utils/emailSender");

// signup method
const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  emailSender({
    from: "noreply@something.com",
    to: email,
    subject: "Verification Email",
    text: "Please click on the following to verify your account",
    html: "<button>Click to verify</button>",
  });
};

module.exports = { signup };
