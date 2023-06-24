const express = require("express");
const viewsController = require("../controllers/viewsController");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// viewRouter.js

router.get("/", viewsController.getIndex);

// ...

router.get("/about", viewsController.getAbout);
router.get("/team", viewsController.getTeam);
router.get("/join-us", viewsController.getCareers);
router.get("/news", viewsController.getNews);
router.get("/whitepaper", viewsController.getWhitepaper);
router.get("/blog", viewsController.getBlog);
router.get("/contact", viewsController.getContact);
router.get("/courses", viewsController.getCourses);
router.get("/courses/intro-ai", viewsController.getCourse);
router.get("/login", viewsController.getLogin);
router.get("/register", viewsController.getRegister);
router.get("/learn", viewsController.getLearn);
router.get("/class", viewsController.getClass);
router.get("/profile", viewsController.getProfile);
router.get("/index2", viewsController.getIndex2);

router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
});
module.exports = router;
