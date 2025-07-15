const { user } = require("../db/prismaClient")
const db = require("../db/queries")
const cloudinary = require("cloudinary").v2;
const fs = require("fs")
const path = require("path")

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

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `user_files/${req.user.id}`
        });

        fs.unlinkSync(req.file.path);

        await db.createFile(result.secure_url, parseInt(req.body.folderId))

        res.redirect("/dashboard")
    } catch (error) {
        console.log(error)
        res.status(500).send("Failed to upload file")
    }
}

exports.editFileForm = async (req, res) => {
    const folders = await db.getFoldersByUserId(req.user.id)

    res.render("dashboard", {user: req.user, section: 'edit-folder', folders: folders, idToEdit: parseInt(req.params.id)})
}

exports.renameFolder = async (req, res) => {
    const userId = req.user.id
    const folderId = req.params.id
    const newName = req.body.newName

    if ( await db.userOwnsFolder(userId, folderId)) {
        await db.renameFolder(folderId, newName)
        res.redirect("/dashboard")
    } else {
        return res.send("You do not own this folder")
    }
}

exports.deleteFolder = async (req, res) => {
    const userId = req.user.id
    const folderId = req.params.id
    
    if (await db.userOwnsFolder(userId, folderId)) {
        await db.deleteFolder(folderId)
        res.redirect("/dashboard")
    } else {
        return res.send("You do not own this folder")
    }
}