const db = require("../db/queries")

exports.dashboardGet = (req, res) => {
    res.render("dashboard", {user: req.user, section: null})
}

exports.newFolderGet = (req, res) => {
    res.render("dashboard", {user: req.user, section: 'new-folder'})
}

exports.createFolder = async (req, res) => {
    await db.createFolder(req.user, req.body.folderName)

    
}