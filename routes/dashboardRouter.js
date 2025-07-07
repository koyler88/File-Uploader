const { Router } = require("express")
const dashboardRouter = Router()
const dashboardController = require("../controllers/dashboardController")

dashboardRouter.get("/", dashboardController.dashboardGet)

module.exports = dashboardRouter