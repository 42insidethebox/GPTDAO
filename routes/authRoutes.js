const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

router.post(
  "/register",
  [
    body("username", "Username is required").notEmpty(),
    body(
      "email",
      "Email is required and should be a valid email address"
    ).isEmail(),
    body(
      "password",
      "Password is required and should be at least 6 characters long"
    ).isLength({ min: 6 }),
  ],
  authController.registerUser
);

router.post(
  "/login",
  [
    body(
      "email",
      "Email is required and should be a valid email address"
    ).isEmail(),
    body("password", "Password is required").notEmpty(),
  ],
  authController.loginUser
);

module.exports = router;
