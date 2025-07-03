require("dotenv").config();
const path = require("node:path");
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const passport = require("passport");
const flash = require("connect-flash")
require("./middleware/passport");

// Import Routers
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");

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
app.use(flash())

// initialize session
app.use(passport.session());

// Routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
