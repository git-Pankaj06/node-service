export interface Text {
    type: string,
    text: {
        body: string
    }
}

export interface Audio {
    type: string,
    audio: {
        link: string
    }
}

export interface Button {
    type: string,
    interactive: {
        type: string,
        header: {
            type: string,
            text: string
        },
        body: {
            text: string
        },
        action: {
            buttons: Array<{
                type: string,
                reply: {
                    id: string,
                    title: string
                }
            }>
        }
    }
}

export interface Contact {
    type: string,
    contacts: Array<{
        addresses?: Array<{
            street?: string,
            city?: string,
            state?: string,
            zip?: string,
            country?: string,
            country_code?: string,
            type?: string
        }>,
        birthday?: string,
        emails?: Array<{
            email: string,
            type?: string
        }>,
        name?: {
            formatted_name?: string,
            first_name?: string,
            last_name?: string,
            middle_name?: string,
            suffix?: string,
            prefix?: string
        },
        org?: {
            company?: string,
            department?: string,
            title?: string
        },
        phones: Array<{
            phone?: string,
            type?: string,
            wa_id?: string
        }>,
        urls?: Array<{
            url: string,
            type?: string
        }>
    }>
}

export interface Document {
    type: string,
    document: {
        link: string,
        filename: String
    }
}

export interface Gallery {
    type: string,
    interactive: {
        type: string,
        header: {
            type: string,
            image: {
                link: string
            }
        },
        footer:{
            text: string
        },
        body:{
            text: string
        },
        action: {
            buttons: Array<{
                type: string,
                reply:{
                   id: string,
                   title: string
                }
            }>
        }
    }
}

export interface Group {
    replies: Array<string>
}

export interface Image {
    type: string,
    image: {
        link: string,
        caption: string
    }
}

export interface Link {
    type: string,
    text: {
        body: string,
        preview_url: string
    }
}

export interface List {
    type: string,
    interactive: {
        type: string,
        header: {
            type: string,
            text: string
        },
        footer: {
            text: string
        },
        body: {
            text: string
        },
        action: {
            button: string,
            sections: Array<{
                title: string,
                rows: Array<{
                    id: string,
                    title: string,
                    description: string
                }>
            }>
        }
    }
}

export interface Location {
    type: string,
    location: {
        latitude: string,
        longitude: string,
        name: string,
        address: string
    }
}

export interface Replies {
    type: string,
    interactive: {
        type: string,
        header: {
            type: string,
            text: string
        },
        body: {
            text: string
        },
        action: {
            buttons: Array<{
                type: string,
                reply: {
                    id: string,
                    title: string
                }
            }>
        }
    }
}

export interface Video {
    type: string,
    video: {
        link: string,
        caption: string
    }
}