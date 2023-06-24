// routes/newsRouter.js
const express = require("express");
const newsController = require("../controllers/newsController");

const router = express.Router();

router
  .route("/")
  .get(newsController.getAllNews)
  .post(newsController.createNews); // I added a POST endpoint in case you want to add a news item

router.post("/submit-news", newsController.submitNews);

module.exports = router;
