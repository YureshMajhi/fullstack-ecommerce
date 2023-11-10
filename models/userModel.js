const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
  is_Verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.statics.signup = async function (email, username, password) {
  // validate email and password
  if (!email || !username || !password) {
    throw Error("All feilds are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  if (!validator.isLength(username, { min: 6 })) {
    throw Error("username must be atleast 6 characters long.");
  }

  // email already in use or not
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email is already in use");
  }

  // user already exist or not
  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error("Username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
