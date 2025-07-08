const { Router } = require("express")
const dashboardRouter = Router()
const dashboardController = require("../controllers/dashboardController")

dashboardRouter.get("/", dashboardController.dashboardGet)

dashboardRouter.get("/new-folder", dashboardController.newFolderGet)
dashboardRouter.post("/create-folder", dashboardController.createFolder)

module.exports = dashboardRouter