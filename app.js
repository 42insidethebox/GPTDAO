const express = require("express");
const userRouter = require("./routes/userRouter");
const path = require("path");
const openai = require("openai");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const viewRouter = require("./routes/viewRouter");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

console.log("Before loggedIn middleware");
app.use((req, res, next) => {
  res.locals.loggedIn = req.cookies.jwt ? true : false;
  console.log("loggedIn status:", res.locals.loggedIn);
  next();
});

// Set the correct MIME types for CSS and JS files
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// ...
// Set up Content Security Policy to allow inline scripts
const csp = require("helmet-csp");
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com",
      ], // Added Google Fonts
      imgSrc: ["'self'", "data:", "http://localhost:3000"], // Added localhost for images
      connectSrc: ["'self'"],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com",
      ], // Added Google Fonts and Font Awesome
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["https://pancakeswap.finance", "https://opensea.io"],
    },
  })
);

// ...

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use("/api/v1/users", userRouter);
app.use("/api/auth", authRoutes);
app.use("/", viewRouter);

module.exports = app;
