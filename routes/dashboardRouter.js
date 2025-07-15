const { Router } = require("express")
const dashboardRouter = Router()
const dashboardController = require("../controllers/dashboardController")
const multer = require("multer")
const upload = multer({ dest: './public/data/uploads/'})

// Main Dashboard
dashboardRouter.get("/", dashboardController.dashboardGet)
// Folder Creation Form
dashboardRouter.get("/new-folder", dashboardController.newFolderGet)
dashboardRouter.post("/create-folder", dashboardController.createFolder)
// File Creation Form
dashboardRouter.get("/new-file", dashboardController.newFileGet)
dashboardRouter.post("/create-file", upload.single('file'), dashboardController.createFile)
// Folder Editing
dashboardRouter.get("/folder/:id/edit", dashboardController.editFileForm)
dashboardRouter.post("/folder/:id/rename", dashboardController.renameFolder)
// Folder Deletion
dashboardRouter.post("/folder/:id/delete", dashboardController.deleteFolder)
// Folder Viewing
dashboardRouter.get("/folder/:id", dashboardController.viewFolder)

module.exports = dashboardRouter