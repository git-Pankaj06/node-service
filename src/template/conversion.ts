import { 
    Text as ClientText,
    Audio as ClientAudio,
    Button as ClientButton,
    Contact as ClientContact,
    Document as ClientDocument,
    Gallery as ClientGallery,
    Group as ClientGroup,
    Image as ClientImage,
    Link as ClientLink,
    List as ClientList,
    Location as ClientLocation,
    Replies as ClientReplies,
    Video as ClientVideo
} from "./client";
import { 
    Text as ServerText,
    Audio as ServerAudio,
    Button as ServerButton,
    Contact as ServerContact,
    Document as ServerDocument,
    Gallery as ServerGallery,
    Group as ServerGroup,
    Image as ServerImage,
    Link as ServerLink, 
    List as ServerList,
    Location as ServerLocation,
    Replies as ServerReplies,
    Video as ServerVideo
} from "./server"
const Joi = require("joi")

export function Text(client: ClientText): ServerText {
    let payload: ServerText = {
        "type": "text",
        "text": {
            "body": client.default
        }
    }

    return payload
}

export function Audio(client: ClientAudio): ServerAudio {
    let payload: ServerAudio = {
        "type": "audio",
        "audio": {
            "link": client.link
        }
    }

    return payload
}

export function Button(client: ClientButton): ServerButton {
    let payload: ServerButton = {
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "text",
                "text": client.header.default
            },
            "body": {
                "text": client.body.default
            },
            "action": {
                "buttons": client.buttons.map(item => {
                    return {
                        "type": "reply",
                        "reply": {
                            "id": item.id,
                            "title": item.title.default
                        }
                    }
                })
            }
        }
    }

    return payload
}

export function Contact(client: ClientContact): ServerContact {
    let payload: ServerContact = {
        "type": "contacts",
        "contacts": [{
            "addresses": client.addresses,
            "birthday": client.birthday,
            "emails": client.emails,
            "name": client.name,
            "org": client.org,
            "phones": client.phones,
            "urls": client.urls
        }],
    }

    return payload
}

export function Document(client: ClientDocument): ServerDocument {
    const payload: ServerDocument = {
        "type": "document",
        "document": {
            "link": client.link,
            "filename": client.filename.default
        }
    }

    return payload
}

export function Gallery(client: ClientGallery): ServerGallery {
    let payload: ServerGallery = {
        "type": "interactive",
        "interactive": {
            "type":"button",
            "header": {
                "type": "image",
                "image": {
                    "link": client.header.image
                }
            },
            "footer": {
                "text": client.footer.default
            },
            "body":{
                "text": client.body.default
            },
            "action": {
                "buttons": client.buttons.map(item => {
                    return {
                        "type":"reply",
                        "reply": {
                            "id": item.id,
                            "title": item.title.default
                        }
                    }
                })
            }
        }
    }

    return payload
}

export function Group(client: ClientGroup): ServerGroup {
    const payload: ServerGroup = {
        "replies": client.replies
    }

    return payload
}

export function Image(client: ClientImage): ServerImage {
    const payload: ServerImage = {
        "type": "image",
        "image": {
            "link": client.link,
            "caption": client.caption.default
        }
    }

    return payload
}

export function Link(client: ClientLink): ServerLink {
    const payload: ServerLink = {
        "type": "text",
        "text": {
            "body": client.body,
            "preview_url": "true"
        }
    }

    return payload
}

export interface List {
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

export interface Location {
    latitude: string,
    longitude: string,
    name: string,
    address: string
}

export interface Replies {
    header: string,
    body: string,
    options: Array<{
        id: string,
        title: string
    }>
}

export function Video(client: ClientVideo): ServerVideo {
    const payload: ServerVideo = {
        "type": "video",
        "video": {
            "link": client.link,
            "caption": client.caption.default
        }
    }

    return payload
}