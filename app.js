const express = require("express");
const userRouter = require("./routes/userRouter");
const path = require("path");
const openai = require("openai");
const { decodeJWT } = require("./utils/decodeJWT");
const authRoutes = require("./routes/authRoutes");
const reportRouter = require("./routes/reportRoutes");
require("dotenv").config();

const viewRouter = require("./routes/viewRouter");
const proposalRoutes = require("./routes/proposalRouter");
const newsRouter = require("./routes/newsRouter");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const User = require("./models/userModel");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use((req, res, next) => {
  res.locals.loggedIn = req.cookies.jwt ? true : false;
  console.log("loggedIn status:", res.locals.loggedIn);
  next();
});

// Middleware to get the user from the JWT token
app.use(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodedToken = await decodeJWT(req.cookies.jwt);

      // Fetch the user from the database
      const user = await User.findById(decodedToken.id);

      // Attach the user object to res.locals
      res.locals.user = user;

      // Also attach the user object to req.user for use in other middlewares
      req.user = user;
      console.log(req.user);
    } catch (error) {
      console.error("Error decoding JWT or fetching the user:", error);
    }
  }

  next();
});

app.use(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodedToken = await decodeJWT(req.cookies.jwt);

      // Fetch the user from the database
      const user = await User.findById(decodedToken.id);

      // If a user is found and they have the role 'admin', set isAdmin to true
      if (user && user.role === "admin") {
        res.locals.isAdmin = true;
        console.log("this is res.locals", res.locals);
      }
    } catch (error) {
      console.error("Error decoding JWT or fetching the user:", error);
    }
  }

  next();
});
// Set the correct MIME types for CSS and JS files
app.use(express.static("public"));

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
      ],
      imgSrc: [
        "'self'",
        "data:",
        "http://localhost:3000",
        "https://your-external-image-server.com", // Add the external server hosting your images
      ],
      connectSrc: ["'self'"],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com",
      ],
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
app.use("/api/v1/proposals", proposalRoutes);
app.use("/api/v1/reports", reportRouter);
app.use("/api/v1/", newsRouter);
module.exports = app;
