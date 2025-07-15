require("dotenv").config();
const path = require("node:path");
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const passport = require("passport");
const flash = require("connect-flash");
require("./middleware/passport");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Import Routers
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const logoutRouter = require("./routes/logoutRouter");

const app = express();

// static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// views assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// prisma session store
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Flash middleware
app.use(flash());

// initialize session
app.use(passport.session());

// Authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/dashboard", ensureAuthenticated, dashboardRouter);
app.use("/logout", logoutRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
