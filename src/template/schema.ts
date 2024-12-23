const Joi = require("joi")
import { 
    Text as ConvertText,
    Audio as ConvertAudio,
    Button as ConvertButton,
    Contact as ConvertContact,
    Document as ConvertDocument,
    Gallery as ConvertGallery,
    Group as ConvertGroup,
    Image as ConvertImage,
    Link as ConvertLink, 
    List as ConvertList,
    Location as ConvertLocation,
    Replies as ConvertReplies,
    Video as ConvertVideo
} from "./multi-conversion"

const TextSchema = Joi.object({
    default: Joi.string()
}).unknown(true)

const AudioSchema = Joi.object({
    link: Joi.string().required()
})

const ButtonSchema = Joi.object({
    header: TextSchema,
    body: TextSchema,
    buttons: Joi.array().items({
        id: Joi.string().required(),
        title: TextSchema
    })
})

const ContactSchema = Joi.object({
    addresses: Joi.array().items(Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string(),
        country: Joi.string(),
        country_code: Joi.string(),
        type: Joi.string(),
    })),
    birthday: Joi.string(),
    emails: Joi.array().items(Joi.object({
        email: Joi.string(),
        type: Joi.string(),
    })),
    name: {
        formatted_name: Joi.string(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        middle_name: Joi.string(),
        suffix: Joi.string(),
        prefix: Joi.string(),
    },
    org: {
        company: Joi.string(),
        department: Joi.string(),
        title: Joi.string(),
    },
    phones: Joi.array().items(Joi.object({
        phone: Joi.string(),
        type: Joi.string(),
        wa_id: Joi.string(),
    })),
    urls: Joi.array().items(Joi.object({
        url: Joi.string(),
        type: Joi.string()
    }))
})

const DocumentSchema = Joi.object({
    link: Joi.string().required(),
    filename: TextSchema
})

const GallerySchema = Joi.object({
    header: {
        image: Joi.string().required()
    },
    footer: TextSchema,
    body: TextSchema,
    buttons: Joi.array().items({
        id: Joi.string().required(),
        title: TextSchema
    })
})

const GroupSchema = Joi.object({
    replies: Joi.array().items(Joi.string())
})

const ImageSchema = Joi.object({
    link: Joi.string().required(),
    caption: TextSchema
})

const LinkSchema = Joi.object({
    body: Joi.string().required()
})

const ListSchema = Joi.object({
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

const LocationSchema = Joi.object({
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    name: TextSchema,
    address: TextSchema
})

const RepliesSchema = Joi.object({
    header: Joi.string(),
    body: TextSchema,
    buttons: Joi.array().max(3).items({
        id: Joi.string().required(),
        title: TextSchema
    })
})

const VideoSchema = Joi.object({
    link: Joi.string().required(),
    caption: TextSchema
})

const validate = function(type: string, params){
    if(type === "text") return TextSchema.validate(params)
    else if(type == "audio") return AudioSchema.validate(params)
    else if(type == "button") return ButtonSchema.validate(params)
    else if(type == "contact") return ContactSchema.validate(params)
    else if(type == "document") return DocumentSchema.validate(params)
    else if(type == "gallery") return GallerySchema.validate(params)
    else if(type == "group") return GroupSchema.validate(params)
    else if(type == "image") return ImageSchema.validate(params)
    else if(type == "link") return LinkSchema.validate(params)
    else if(type == "list") return ListSchema.validate(params)
    else if(type == "location") return LocationSchema.validate(params)
    else if(type == "replies") return RepliesSchema.validate(params)
    else if(type == "video") return VideoSchema.validate(params)
}

const convert = function(type: string, client) {
    if(type === "text") return ConvertText(client)
    else if(type == "audio") return ConvertAudio(client)
    else if(type == "button") return ConvertButton(client)
    else if(type == "contact") return ConvertContact(client)
    else if(type == "document") return ConvertDocument(client)
    else if(type == "gallery") return ConvertGallery(client)
    else if(type == "group") return ConvertGroup(client)
    else if(type == "image") return ConvertImage(client)
    else if(type == "link") return ConvertLink(client)
    else if(type == "list") return ConvertList(client)
    else if(type == "location") return ConvertLocation(client)
    else if(type == "replies") return ConvertReplies(client)
    else if(type == "video") return ConvertVideo(client)
}

export default function(type: string, params){
    let { value, error } = validate(type, params)

    if(error) throw new Error(error)

    return convert(type, value)
}