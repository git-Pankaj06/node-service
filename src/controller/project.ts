const Node = require("../model/node")
const { AddOrUpdate } = require("./node")
const Fs = require("fs")

require("dotenv").config();

export async function List() {
    return await Node.find({}).distinct("projectName")    
} 

export async function Add(projectName) {
    // return error of project already exist
    const project = await Node.find({projectName}).count()
    
    if(project > 0) throw new Error("Project already exist with this name")

    const templatePath = process.env.TEMPLATE_PATH
    const textTemplate = Fs.readFileSync(templatePath + "/text.json", "utf8")

    let id = "salutation"
    let type = "text"
    let payload = JSON.stringify(JSON.parse(textTemplate), null, 4)
    let tags = ""

    return await AddOrUpdate({
        projectName,
        id,
        type,
        payload,
        tags
    })
} 

interface Data {
    projectName?: string,
    id: string,
    type: string,
    payload: string,
    tags: string
}

export async function Get(projectName){
    let nodes = await Node
    .find({projectName})
    .select({id: 1, type: 1, raw: 1, tags: 1})
    
    let result: Data[] = []
    
    nodes.forEach(item => {
        result.push({
            id: item.id,
            type: item.type,
            payload: item.raw,
            tags: item.tags.join(", ")
        })
    });

    return result
}