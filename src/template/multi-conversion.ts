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
} from "./server";
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
} from "./conversion"

export function Text(client: ClientText): {[key: string]: ServerText} {
    let result: any = {}
    Object.keys(client).forEach(key => {
        const c: ClientText = {default: client[key]}

        result[key] = ConvertText(c)
    })

    return result
}

export function Audio(client: ClientAudio): {[key: string]: ServerAudio} {
    return {default: ConvertAudio(client)}
}

export function Button(client: ClientButton): {[key: string]: ServerButton} {
    let result = {}

    let languages: Set<string> = new Set()

    Object.keys(client.header).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(client.body).forEach(lang => {
        languages.add(lang)
    })

    client.buttons.forEach(button => {
        Object.keys(button.title).forEach(lang => {
            languages.add(lang)
        })
    })
    
    for(const lang of languages) {  
        let clientDefault: ClientButton = {
            header: {
                default: client.header[lang] || client.header.default
            },
            body: {
                default: client.body[lang] || client.body.default
            },
            buttons: client.buttons.map(button => {
                return {
                    id: button.id,
                    title: {
                        default: button.title[lang] || button.title.default
                    }
                }
            })
        }

        result[lang] = ConvertButton(clientDefault)
    }

    return result
}

export function Contact(client: ClientContact): {[key: string]: ServerContact} {
    return {default: ConvertContact(client)}
}

export function Document(client: ClientDocument): {[key: string]: ServerDocument} {
    let result = {}
    let clientDefault: ClientDocument = {link: client.link, filename: {default: ""}}

    Object.keys(client.filename).forEach(key => {
        clientDefault.filename.default = client.filename[key]

        result[key] = ConvertDocument(clientDefault)
    })

    return result
}

export function Gallery(client: ClientGallery): {[key: string]: ServerGallery} {
    let result = {}
    let languages: Set<string> = new Set()

    Object.keys(client.header).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(client.footer).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(client.body).forEach(lang => {
        languages.add(lang)
    })

    client.buttons.forEach(item => {
        Object.keys(item.title).forEach(lang => {
            languages.add(lang)
        })
    })

    for(const lang of languages) {
        let clientDefault: ClientGallery = {
            header: client.header,
            footer: {
                default: client.footer[lang] || client.footer.default
            },
            body: {
                default: client.body[lang] || client.body.default
            },
            buttons: client.buttons.map(button => {
                return {
                    id: button.id,
                    title: {
                        default: button.title[lang] || button.title.default
                    }
                }
            })
        }

        result[lang] = ConvertGallery(clientDefault)
    }

    return result
}

export function Group(client: ClientGroup): {[key: string]: ServerGroup} {
    return {default: ConvertGroup(client)}
}

export function Image(client: ClientImage): {[key: string]: ServerImage} {
    let result = {}

    Object.keys(client.caption).forEach(key => {
        result[key] = ConvertImage({
            link: client.link,
            caption: {
                default: client.caption[key]
            }
        })
    })

    return result
}

export function Link(client: ClientLink): {[key: string]: ServerLink}{
    return {default: ConvertLink(client)}
}

export function List(client: ClientList): {[key: string]: ConvertList} {
    let result = {}

    let languages: Set<string> = new Set()

    Object.keys(client.header).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(client.footer).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(client.body).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(client.actionTitle).forEach(lang => {
        languages.add(lang)
    })

    client.options.forEach(item => {
        Object.keys(item.title).forEach(lang => {
            languages.add(lang)
        })

        Object.keys(item.description).forEach(lang => {
            languages.add(lang)
        })
    })

    for(const lang of languages) {
        let server: ConvertList = {
            header: client.header[lang] || client.header.default,
            footer: client.footer[lang] || client.footer.default,
            body: client.body[lang] || client.body.default,
            actionTitle: client.actionTitle[lang] || client.actionTitle.default,
            options: client.options.map(item => {
                return {
                    id: item.id,
                    title: item.title[lang] || item.title.default,
                    description: item.description[lang] || item.description.default
                }
            })
        }

        result[lang] = server
    }

    return result
}

export function Location(client: ClientLocation): {[key: string]: ConvertLocation} {
    let result = {}
    let languages: Set<string> = new Set()

    Object.keys(client.name).forEach(lang => {
        languages.add(lang)
    })

    Object.keys(client.address).forEach(lang => {
        languages.add(lang)
    })

    for(const lang of languages) {
        let server: ConvertLocation = {
            latitude: client.latitude,
            longitude: client.longitude,
            name: client.name[lang] || client.name.default,
            address: client.address[lang] || client.address.default
        }

        result[lang] = server
    }

    return result
}

export function Replies(client: ClientReplies): {[key: string]: ConvertReplies} {
    let result = {}
    let languages: Set<string> = new Set()

    Object.keys(client.body).forEach(lang => {
        languages.add(lang)
    })

    client.options.forEach(button => {
        Object.keys(button.title).forEach(lang => {
            languages.add(lang)
        })
    })

    for(const lang of languages) {
        let server: ConvertReplies = {
            header: client.body[lang] || client.body.default,
            body: client.body[lang] || client.body.default,
            options: client.options.map(button => {
                return {
                    id: button.id,
                    title: button.title[lang] || button.title.default
                }
            })
        }

        result[lang] = server
    }

    return result
}

export function Video(client: ClientVideo): {[key: string]: ServerVideo} {
    let result = {}
    Object.keys(client.caption).forEach(lang => {
        let clientDefault: ClientVideo = {
            link: client.link,
            caption: {
                default: client.caption[lang] || client.caption.default
            }
        }
        
        result[lang] = ConvertVideo(clientDefault)
    })

    return result
}



