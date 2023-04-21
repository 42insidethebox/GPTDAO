exports.getIndex = (req, res) => {
  const isLoggedIn = !!req.cookies.jwt; // check if jwt cookie is present
  res.status(200).render("index", {
    title: "Home",
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

exports.getProfile = (req, res) => {
  res.status(200).render("profile", {
    title: "Profile",
  });
};

exports.getIndex2 = (req, res) => {
  res.status(200).render("index2", {
    title: "Index2",
  });
};
