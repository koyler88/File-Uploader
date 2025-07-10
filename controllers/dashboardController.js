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

exports.newFileGet = async (req, res) => {
    const folders = await db.getFoldersByUserId(req.user.id)

    res.render("dashboard", {user: req.user, section: 'new-file', folders: folders})
}

exports.createFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded")
        }

        await db.createFile(req.file, parseInt(req.body.folderId))

        res.redirect("/dashboard")
    } catch (error) {
        console.log(error)
        res.status(500).send("Failed to upload file")
    }
}