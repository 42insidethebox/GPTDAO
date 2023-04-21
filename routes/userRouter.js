const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const authenticateJWT = require(".././middlwares/auth");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router
  .route("/")
  .get(
    authenticateJWT.protectRoute,
    authenticateJWT.requireAdminRole,
    getUsers
  );
router
  .route("/:id")
  .get(authenticateJWT.protectRoute, getUser)
  .put(authenticateJWT.protectRoute, updateUser)
  .delete(authenticateJWT.protectRoute, deleteUser);

router.get("/profile", authController.getUserProfile);

module.exports = router;
