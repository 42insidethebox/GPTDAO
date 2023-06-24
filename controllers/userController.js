const User = require("../models/userModel");

// @desc    Get all users
// @route   GET /api/v1/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get a single user
// @route   GET /api/v1/users/:id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Create a new user
// @route   POST /api/v1/users
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error :(" });
  }
};

// @desc    Update a user
// @route   PUT /api/v1/users/:id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    await user.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

//

// 1. Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 2. Update user profile
exports.updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, bio, profileImage } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.profileImage = profileImage || user.profileImage;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 3. Delete user account
exports.deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.remove();
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.verifyEmail = async (req, res) => {
  const token = req.params.token;

  // Find the user with the given token
  const user = await User.findOne({ emailVerificationToken: token });

  // If no user is found, send an error response
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid verification token.",
    });
  }

  // Mark the user's email as verified and remove the token
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  // Send a success response
  res.status(200).json({
    status: "success",
    message:
      "Email successfully verified. You can now access the DAO and University features.",
  });
};

exports.updateUserDisplayName = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { displayName: req.body.displayName },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateUserEmail = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { email: req.body.email },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
