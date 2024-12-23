const Router = require("express").Router()
const Project = require("../controller/project")

Router.post("/:projectName", async function(req, res) {
    try {
        await Project.Add(req.params.projectName)

        res.send("ok")
    } catch (error) {
        res.status(500)
        res.send(error.message)   
    }
})

Router.get("/:projectName", async function(req, res) {
    try {
        let data = await Project.Get(req.params.projectName)
        
        res.json(data)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

module.exports = Router