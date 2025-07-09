const db = require("../db/queries")

exports.dashboardGet = async (req, res) => {
    const userWithFolders = await db.getUserByIdWithFolders(req.user.id)

    res.render("dashboard", {user: userWithFolders, section: null})
}

exports.newFolderGet = (req, res) => {
    res.render("dashboard", {user: req.user, section: 'new-folder'})
}

exports.createFolder = async (req, res) => {
    await db.createFolder(req.user, req.body.folderName)

    res.redirect("/dashboard")

}