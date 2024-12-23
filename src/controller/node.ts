const Node = require("../model/node")
const Type = require("../controller/type")
import Template from "../lib/conversion"

interface Data {
    projectName?: string,
    id: string,
    type: string,
    payload: string,
    tags: string
}

function ParseTags(tags: string): Array<string> {
    if(tags.length === 0) return []

    return tags.split(",").map(item => item.trim())
}

export async function Get(projectName, id, phoneNumber, lang){
    let result = await Node.findOne({projectName, id}).select({processed: 1, type: 1})
        
    if(!result) throw new Error("Cannot find node")
    else if(result.type === "text"){
        let schema = result.processed[lang] || result.processed.default
        result = Type.Text(phoneNumber, schema.text)
    }else if(result.type === "document"){
        let schema = result.processed[lang] || result.processed.default
        result = Type.Document(phoneNumber, schema.filename, schema.link)
    }else if(result.type === "list") {
        let schema = result.processed[lang] || result.processed.default
        result = Type.List(phoneNumber, schema.header, schema.body, schema.footer, schema.actionTitle, schema.options)
    }else if(result.type === "replies") {
        let schema = result.processed[lang] || result.processed.default
        result = Type.Replies(phoneNumber, schema.header, schema.body, schema.options)
    }else if(result.type === "location"){
        let schema = result.processed[lang] || result.processed.default
        result = Type.Location(phoneNumber, schema.latitude, schema.latitude, schema.name, schema.address)
    }else {
        throw new Error("not found")
    }
    
    return result
}

export async function AddOrUpdate({projectName, id, type, payload, tags}: Data) {
    let node = await Node.findOne({projectName, id}).select({id: 1})
    let payloadJSON = JSON.parse(payload)
    let parsedTags = ParseTags(tags)

    try {
        let converted = Template(type, payloadJSON)    
        let internal_ids = ""
        
        // extract searchables
        if(converted.default && converted.default["options"] && Array.isArray(converted.default["options"])){
            internal_ids = converted.default["options"].map(item => item.id).join(" ")
        }
        
        if (node){
            await Node.updateOne({projectName, id}, {$set: {
                type,
                raw: JSON.stringify(payloadJSON, null, 4),
                processed: converted,
                tags: parsedTags,
                internal_ids
            }})
        }else {
            await Node.create({
                projectName,
                id,
                type,
                raw: JSON.stringify(payloadJSON, null, 4),
                processed: converted,
                tags: parsedTags,
                internal_ids
            })
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function SearchInternalId(projectName, internalId){
    let result = await Node.find({projectName, $text: {$search: internalId, $caseSensitive: true}}).select({id: 1})
    
    return result.map(item => item.id)
}

export async function SearchTags(projectName){
    let result = await Node.find({projectName,}).select({id: 1,tags:1})
    
    return result
}