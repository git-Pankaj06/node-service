import exp from "constants"
import {
    Text as TextInterface,
    Document as DocumentInterface,
    List as ListInterface,
    Replies as RepliesInterface,
    Location as LocationInterface
} from "../lib/whatsapp-types"

const Payload = (
phoneNumber: string, 
typePart: TextInterface 
    | DocumentInterface
    | ListInterface
    | RepliesInterface
    | LocationInterface
) => ({
    messaging_product: "whatsapp",
    to: phoneNumber,
    ...typePart
})

export function Text(phoneNumber: string, text: string) {
    const typePart: TextInterface = {
        "type": "text",
        "text": {
            "body": text
        }
    }

    return [Payload(phoneNumber, typePart)]
}

export function Document(phoneNumber: string, filename: string, link: string) {
    const typePart: DocumentInterface = {
        "type": "document",
        "document": {
            link,
            filename
        }
    }

    return [Payload(phoneNumber, typePart)]
}

export function List(
    phoneNumber: string, 
    header: string, 
    body: string, 
    footer: string, 
    actionTitle: string, 
    options: Array<{id: string, title: string}>
) {
    // maximum 10 options are allowed at a time
    const limit = 10

    
    const optionsLength = options.length
    const result = []
    let counter = 0;
    
    while (counter < optionsLength) {
        const typePart: ListInterface = {
            "type": "interactive",
            "interactive": {
                "type": "list",
                "header": {
                    "type": "text",
                    "text": header || ""
                },
                "body": {
                    "text": body || ""
                },
                "footer": {
                    "text": footer || ""
                },
                "action": {
                    "button": "Send",
                    "sections": [{
                        "title": actionTitle,
                        "rows": options.slice(counter, counter + limit).map(item => ({
                            "id": item.id,
                            "title": item.title,
                            "description": ""
                        }))
                    }] 
                }
            }
        }
        result.push(Payload(phoneNumber, typePart))

        counter += limit
    }

    return result
}

export function Replies(phoneNumber, header, body, options) {
    const typePart: RepliesInterface = {
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "text",
                "text": header || ""
            },
            "body": {
                "text": body || ""
            },
            "action": {
                "buttons": options.map(item => {
                    return {
                        "type": "reply",
                        "reply": {
                            "id": item.id,
                            "title": item.title
                        }
                    }
                })
            }
        }
    }

    return [Payload(phoneNumber, typePart)]
}

export function Location(phoneNumber, latitude, longitude, name, address){
    const typePart: LocationInterface = {
        "type": "location",
        "location": {
            "latitude": latitude,
            "longitude": longitude,
            "name": name,
            "address": address
        }
    }

    return [Payload(phoneNumber, typePart)]
}