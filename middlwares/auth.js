const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protectRoute = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    console.log(req.user);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ error: "Token expired, please log in again" });
    }
    res.status(401).json({ error: "Invalid token, authorization denied" });
  }
};

exports.requireAdminRole = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Not an admin user." });
  }
  next();
};

exports.checkAuthentication = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    req.isAuthenticated = false;
    return next();
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    req.isAuthenticated = true;
  } catch (error) {
    req.isAuthenticated = false;
  }

  next();
};

exports.checkEmailVerified = (req, res, next) => {
  if (!req.user.emailVerified) {
    return res.status(403).json({
      status: "fail",
      message:
        "Your email is not verified. Please verify your email to access this feature.",
    });
  }
  next();
};
