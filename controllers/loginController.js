const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.loginGet = (req, res) => {
  res.render("login", { errors: req.flash("error").map((msg) => ({ msg })) });
};

exports.loginPost = [
  body("username").trim().escape(),

  body("password").trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("login", { errors: errors.array() });
    }

    next();
  },

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  }),
];
