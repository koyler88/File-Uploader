const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("../middleware/passport")

exports.registerGet = (req, res) => {
  res.render("register", { errors: [] });
};

exports.registerPost = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .escape(),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),

  body("confirmation")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not matchh"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("register", {
        errors: errors.array(),
      });
    }

    const info = req.body;

    if (await db.userTaken(info.username)) {
      return res.render("register", {
        errors: [{ msg: "Username already taken. Please choose another" }],
      });
    }

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await db.createUser(username, hashedPassword);

      req.login(newUser, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server Error (Login)");
        }
        return res.redirect("/dashboard");
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
];
