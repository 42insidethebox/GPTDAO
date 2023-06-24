// controllers/newsController.js
const News = require("../models/newsModel");

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();

    res.status(200).json({
      status: "success",
      results: news.length,
      data: {
        news,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNews = async (req, res) => {
  try {
    const newNews = await News.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        news: newNews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.submitNews = async (req, res, next) => {
  try {
    const { title, url, category, author } = req.body;

    const newsItem = await News.create({
      title,
      url,
      category,
      author,
    });

    res.status(201).json({
      status: "success",
      data: {
        newsItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
