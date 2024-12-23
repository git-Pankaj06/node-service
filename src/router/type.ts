const Router = require("express").Router()
const Joi = require("../lib/custom-joi")
const {
    Text,
    Document,
    List,
    Replies
} = require("../controller/type")

Router.get("/text", async function(req, res) {
    const schema = Joi.object({
        phoneNumber: Joi.string().required(),
        text: Joi.string().required()
    })

    const { value, error } = schema.validate(req.query)

    try {
        if(error) throw new Error(error)

        res.json(Text(value.phoneNumber, value.text))
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

Router.get("/document", async function(req, res) {
    const schema = Joi.object({
        phoneNumber: Joi.string().required(),
        link: Joi.url().required(),
        filename: Joi.string().required()
    })

    const { value, error } = schema.validate(req.query)

    try {
        if(error) throw new Error(error)

        res.json(Document(value.phoneNumber, value.filename, value.link))
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

Router.get("/list", async function (req, res) {
    const schema = Joi.object({
        phoneNumber: Joi.string().required(),
        header: Joi.string(),
        body: Joi.string(),
        footer: Joi.string(),
        actionTitle: Joi.string(),
        options: Joi.alternatives().try(
            Joi.array().items({
                id: Joi.string().required(),
                title: Joi.string().required(),
                description: Joi.string()
            }),
            Joi.string()
        ).required() 
    })    
    
    const { value, error } = schema.validate(req.query)

    try {
        if(error) throw new Error(error)

        let {
            phoneNumber,
            header,
            body,
            footer,
            actionTitle,
            options
        } = value

        // if options is string json parse
        if(typeof options == "string") options = JSON.parse(options)        

        res.json(List(phoneNumber, header, body, footer, actionTitle, options))
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})

Router.get("/replies", async function(req, res){
    const schema = Joi.object({
        phoneNumber: Joi.string().required(),
        header: Joi.string(),
        body: Joi.string(),
        options: Joi.alternatives().try(
            Joi.array().max(3).items({
                id: Joi.string().required(),
                title: Joi.string().required()
            }),
            Joi.string()
        ).required() 
    })    
    
    const { value, error } = schema.validate(req.query)

    try {
        if(error) throw new Error(error)

        let {
            phoneNumber,
            header,
            body,
            options
        } = value
        
        // if options is string json parse
        if(typeof options == "string") options = JSON.parse(options)        

        res.json(Replies(phoneNumber, header, body, options))
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})
module.exports = Router