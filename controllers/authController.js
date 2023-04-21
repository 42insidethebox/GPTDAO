const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const catchAsync = require("../utils/asyncHandler");

exports.registerUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = new User({ username, email, password }); // No need to use hashedPassword here
    await user.save();
    console.log("User created:", user);

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
});

exports.loginUser = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    console.log("Request body:", req.body);

    const user = await User.findOne({ email });
    console.log("Found user:", user);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(
      `Comparing passwords for ${email} - input: ${password}, stored: ${user.password}`
    );
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        error: `Invalid email or password. user:${password} on the database ${user.password} `,
      });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    }); // Set the token as an HttpOnly cookie for 1 hour
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: `Server error` });
  }
});

exports.getUserProfile = catchAsync(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `${error.message}` });
  }
});
