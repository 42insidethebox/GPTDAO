const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const authenticateJWT = require(".././middlwares/auth");
const { verifyEmail } = require("../controllers/userController");
const viewsController = require("../controllers/viewsController");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserDisplayName,
  updateUserEmail, // Add this line to import the function
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

router.get(
  "/profile",
  authenticateJWT.protectRoute,
  viewsController.getProfile
);

router.get("/verify-email/:token", verifyEmail);

router.patch(
  "/update-name",
  authenticateJWT.protectRoute,
  updateUserDisplayName
);
router.patch("/update-email", authenticateJWT.protectRoute, updateUserEmail);

module.exports = router;
