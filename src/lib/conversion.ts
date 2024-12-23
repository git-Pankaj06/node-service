import { 
    Text as RawText,
    Document as RawDocument,
    List as RawList,
    Replies as RawReplies,
    Location as RawLocation
} from "./template-types";
import Joi from "./custom-joi"

const TextSchema = Joi.object({
    default: Joi.string()
}).unknown(true)

interface ProcessedText {
    text: string
}

export function Text(raw: RawText): {[key: string]: ProcessedText} {
    const { _, error } = TextSchema.required().validate(raw)

    if(error) throw new Error(error)

    let result: {[key: string]: ProcessedText} = {}

    Object.keys(raw).forEach(lang => {
        result[lang] = {
            text: raw[lang]
        }
    })
    
    return result
}

interface ProcessedDocument {
    link: string,
    filename: string
}

export function Document(raw: RawDocument): {[key: string]: ProcessedDocument} {
    const schema = Joi.object({
        link: Joi.string().required(),
        filename: TextSchema.required()
    })

    const { _, error} = schema.validate(raw)

    if(error) throw new Error(error)

    let result: {[key: string]: ProcessedDocument} = {}
    
    Object.keys(raw.filename).forEach(lang => {
        result[lang] = {
            link: raw.link,
            filename: raw.filename[lang]
        }
    })

    return result
}

interface ProcessedList {
    header: string,
    footer: string,
    body: string,
    actionTitle: string,
    options: Array<{
        id: string,
        title: string,
        description: string
    }>
}

export function List(raw: RawList): {[key: string]: ProcessedList} {
    const schema = Joi.object({
        header: TextSchema,
        footer: TextSchema,
        body: TextSchema.required(),
        actionTitle: TextSchema.required(),
        options: Joi.array().items({
            id: Joi.string().required(),
            title: TextSchema.required(),
            description: TextSchema
        })
    })

    const { _, error } = schema.validate(raw)

    if(error) throw new Error(error)

    let result: {[key: string]: ProcessedList} = {}

    let languages: Set<string> = new Set()

    if(raw.header) Object.keys(raw.header).forEach(lang => {
        languages.add(lang)
    })

    if(raw.footer) Object.keys(raw.footer).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(raw.body).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(raw.actionTitle).forEach(lang => {
        languages.add(lang)
    })

    raw.options.forEach(item => {
        Object.keys(item.title).forEach(lang => {
            languages.add(lang)
        })

        if(item.description) Object.keys(item.description).forEach(lang => {
            languages.add(lang)
        })
    })

    for(const lang of languages) {
        result[lang] = {
            header: raw.header ? (raw.header[lang] || raw.header.default) : "",
            footer: raw.footer ? (raw.footer[lang] || raw.footer.default) : "",
            body: raw.body[lang] || raw.body.default,
            actionTitle: raw.actionTitle[lang] || raw.actionTitle.default,
            options: raw.options.map(item => {
                return {
                    id: item.id,
                    title: item.title[lang] || item.title.default,
                    description: item.description ? (item.description[lang] || item.description.default) : ""
                }
            })
        }
    }

    return result
}

interface ProcessedReplies {
    header?: string,
    body: string,
    options: Array<{
        id: string,
        title: string
    }>
}

export function Replies(raw: RawReplies): {[key: string]: ProcessedReplies} {
    const schema = Joi.object({
        header: TextSchema,
        body: TextSchema.required(),
        options: Joi.array().max(3).items({
            id: Joi.string().required(),
            title: TextSchema.required()
        })
    })

    const { _, error } = schema.validate(raw)

    if(error) throw new Error(error)

    let result = {}
    let languages: Set<string> = new Set()

    if(raw.header) Object.keys(raw.header).forEach(lang => {
        languages.add(lang)
    })
    
    Object.keys(raw.body).forEach(lang => {
        languages.add(lang)
    })

    raw.options.forEach(button => {
        Object.keys(button.title).forEach(lang => {
            languages.add(lang)
        })
    })

    for(const lang of languages) {
        result[lang] = {
            header: raw.header ? (raw.header[lang] || raw.header.default) : "",
            body: raw.body[lang] || raw.body.default,
            options: raw.options.map(button => {
                return {
                    id: button.id,
                    title: button.title[lang] || button.title.default
                }
            })
        }
    }

    return result
}

export function Location(raw: RawLocation): {[key: string]: ProcessedReplies} {
    const schema = Joi.object({
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        name: TextSchema,
        address: TextSchema
    })

    const { _, error } = schema.validate(raw)

    if(error) throw new Error(error)

    let result = {}
    let languages: Set<string> = new Set()

    if(raw.name) Object.keys(raw.name).forEach(lang => {
        languages.add(lang)
    })

    if(raw.address) Object.keys(raw.address).forEach(lang => {
        languages.add(lang)
    })

    for(const lang of languages) {
        result[lang] = {
            latitude: raw.latitude,
            longitude: raw.longitude,
            name: raw.name[lang] || raw.name.default,
            address: raw.address[lang] || raw.address.default
        }
    }

    return result
}

export default function(type: string, raw) {
    if(type === "text") return Text(raw)
    // else if(type == "audio") return ConvertAudio(client)
    // else if(type == "contact") return ConvertContact(client)
    else if(type == "document") return Document(raw)
    // else if(type == "gallery") return ConvertGallery(client)
    // else if(type == "group") return ConvertGroup(client)
    // else if(type == "image") return ConvertImage(client)
    // else if(type == "link") return ConvertLink(client)
    else if(type == "list") return List(raw)
    else if(type == "location") return Location(raw)
    else if(type == "replies") return Replies(raw)
    // else if(type == "video") return ConvertVideo(client)
}
