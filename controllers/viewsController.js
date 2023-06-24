const jwt = require("jsonwebtoken");
const Report = require("../models/reportModel");
const User = require("../models/userModel");
exports.getIndex = async (req, res) => {
  const token = req.cookies.jwt;
  let loggedIn = false;
  let isAdmin = false;
  let user = null;
  let reports = null;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id).select("-password");
    loggedIn = true;
    isAdmin = user.role === "admin";

    // Fetch reports for the admin view
    reports = isAdmin ? await Report.find() : null;
    console.log("isAdmin:", isAdmin);
  }

  // Render the view
  res.status(200).render("index", {
    title: "Home",
    user,
    reports,
    isAdmin,
    loggedIn,
  });
};

exports.getAbout = (req, res) => {
  res.status(200).render("about", {
    title: "About Us",
  });
};

exports.getTeam = (req, res) => {
  res.status(200).render("team", {
    title: "Our Team",
  });
};

exports.getCareers = (req, res) => {
  res.status(200).render("join-us", {
    title: "Join us",
  });
};

exports.getNews = (req, res) => {
  res.status(200).render("news", {
    title: "News",
  });
};

exports.getWhitepaper = (req, res) => {
  res.status(200).render("whitepaper", {
    title: "Whitepaper",
  });
};

exports.getBlog = (req, res) => {
  res.status(200).render("blog", {
    title: "Blog",
  });
};

exports.getContact = (req, res) => {
  res.status(200).render("contact", {
    title: "Contact Us",
  });
};

exports.getCourses = (req, res) => {
  res.status(200).render("university", {
    title: "University",
  });
};

exports.getCourse = (req, res) => {
  res.status(200).render("course", {
    title: "Introduction to AI",
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render("login", {
    title: "Login",
  });
};

exports.getRegister = (req, res) => {
  res.status(200).render("register", {
    title: "Register",
  });
};

exports.getLearn = (req, res) => {
  res.status(200).render("learn", {
    title: "Learn",
  });
};

exports.getClass = (req, res) => {
  res.status(200).render("class", {
    title: "Class",
  });
};
exports.getLogout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

exports.getProfile = async (req, res) => {
  try {
    // Fetch the user details from the database using the user id stored in req.user
    const user = await User.findById(req.user.id).select("-password");

    // Render the profile view and pass the user object
    res.status(200).render("profile", {
      title: "Profile",
      user, // this will pass the user object to your view
    });
  } catch (error) {
    res.status(200).render("login", {
      title: "Login",
    });
  }
};

exports.getIndex2 = (req, res) => {
  res.status(200).render("index2", {
    title: "Index2",
  });
};

exports.getIndex = async (req, res) => {
  const token = req.cookies.jwt;
  let loggedIn = false;
  let isAdmin = false;
  let user = null;
  let reports = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id).select("-password");
      loggedIn = true;
      isAdmin = user.role === "admin";

      // Fetch reports for the admin view
      reports = isAdmin ? await Report.find() : null;
    } catch (err) {
      // Error indicates JWT is expired or invalid. We could also specifically check for err.name === "TokenExpiredError"
      loggedIn = false;
    }
  }

  // Render the view
  res.status(200).render("index", {
    title: "Home",
    user,
    reports,
    isAdmin,
    loggedIn,
  });
};

// Import the Report model at the top of your file
