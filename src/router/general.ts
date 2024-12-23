const Router = require("express").Router()
const Fs = require("fs").promises
const Path = require("path")
const Project = require("../controller/project")

require("dotenv").config();

Router.get("/templates", async function(req, res) {
    const templatePath = process.env.TEMPLATE_PATH

    // list all files
    let filePaths: string[] = await Fs.readdir(templatePath)
    
    // go through all files and load their content
    let contentAwaits: Promise<string>[] = []
    let types: string[] = []

    for(let i = 0; i < filePaths.length; i++){
        let filePath = templatePath + "/" + filePaths[i]
        let fileNameWithoutExt = Path.basename(filePath, ".json")
        
        contentAwaits.push(Fs.readFile(filePath, "utf8"))
        types.push(fileNameWithoutExt)
    }

    let contents: string[] = await Promise.all(contentAwaits)
    
    let result: {type: string, payload: string}[] = []

    for(let i = 0; i < types.length; i++) {
        result.push({
            type: types[i],
            payload: JSON.stringify(JSON.parse(contents[i]), null, 4)
        })
    }

    res.json(result)
})

Router.get("/projects", async function(req, res) {
    let result = await Project.List()

    res.json(result)
})


module.exports = Router