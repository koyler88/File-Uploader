require("dotenv").config();
const path = require("node:path");
const express = require("express");
const indexRouter = require("./routes/indexRouter");

const app = express();

// static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// views assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
