const Router = require("express").Router()
const Node = require("../controller/node")
const Joi = require("joi")

Router.post("/:projectName/node/:id", async function(req, res) {
    const schema = Joi.object({
        type: Joi.string().required(),
        payload: Joi.string().required(),
        tags: Joi.string().allow("")
    })    

    const { _, error } = schema.validate(req.body)
    
    try {
        if(error) throw new Error(error)
        
        const { projectName, id } = req.params
        const { type, payload, tags } = req.body

        await Node.AddOrUpdate({projectName, id, type, payload, tags})

        res.send("ok")
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

Router.get("/:projectName/node/:id", async function(req, res) {
    const { projectName, id } = req.params;

    const schema = Joi.object({
        lang: Joi.string().empty("default"),
        phoneNumber: Joi.string().required()
    })

    let { value, error } = schema.validate(req.query)

    try {
        if(error) throw new Error(error)
        
        const {
            lang,
            phoneNumber
        } = value
    
        const result = await Node.Get(projectName, id, phoneNumber, lang)    
        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

Router.get("/:projectName/search-internal-id", async function(req, res){
    const schema = Joi.object({
        internalId: Joi.string().required()
    })

    const { value, error } = schema.validate(req.query)
    const { projectName } = req.params
    
    try {
        if(error) throw new Error(error)

        let result = await Node.SearchInternalId(projectName, value.internalId)

        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

Router.get("/:projectName/tags", async function(req, res){
    const { projectName } = req.params
    try {
        let result = await Node.SearchTags(projectName)

        res.json(result)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

module.exports = Router
