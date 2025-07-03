const registerController = require("../controllers/registerController");
const { Router } = require("express");
const registerRouter = Router();

registerRouter.get("/", registerController.registerGet);
registerRouter.post("/", registerController.registerPost);

module.exports = registerRouter;
