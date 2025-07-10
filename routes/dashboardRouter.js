const { Router } = require("express")
const dashboardRouter = Router()
const dashboardController = require("../controllers/dashboardController")
const multer = require("multer")
const upload = multer({ dest: './public/data/uploads/'})

dashboardRouter.get("/", dashboardController.dashboardGet)

dashboardRouter.get("/new-folder", dashboardController.newFolderGet)
dashboardRouter.post("/create-folder", dashboardController.createFolder)

dashboardRouter.get("/new-file", dashboardController.newFileGet)
dashboardRouter.post("/create-file", upload.single('file'), dashboardController.createFile)

module.exports = dashboardRouter