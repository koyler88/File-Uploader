

exports.dashboardGet = (req, res) => {
    res.render("dashboard", {user: req.user})
}