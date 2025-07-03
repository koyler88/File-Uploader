const loginController = require("../controllers/loginController");
const { Router } = require("express");
const loginRouter = Router();

loginRouter.get("/", loginController.loginGet);
loginRouter.post("/", loginController.loginPost);

module.exports = loginRouter;
