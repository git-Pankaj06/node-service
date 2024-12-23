export interface Text {
    default: string,
    [key: string]: string
}

// export interface Audio {
//     link: string
// }

// export interface Contact {
//     addresses?: Array<{
//         street?: string,
//         city?: string,
//         state?: string,
//         zip?: string,
//         country?: string,
//         country_code?: string,
//         type?: string
//     }>,

//     birthday?: string,
//     emails?: Array<{
//         email: string,
//         type?: string
//     }>,
//     name?: {
//         formatted_name?: string,
//         first_name?: string,
//         last_name?: string,
//         middle_name?: string,
//         suffix?: string,
//         prefix?: string
//     },
//     org?: {
//         company?: string,
//         department?: string,
//         title?: string
//     },
//     phones?: Array<{
//         phone?: string,
//         type?: string,
//         wa_id?: string
//     }>,
//     urls?: Array<{
//         url: string,
//         type?: string
//     }>
// }

export interface Document {
    link: string,
    filename: Text
}

// export interface Gallery {
//     header: {
//         image: string
//     },

//     footer: Text,

//     body: Text,

//     buttons: Array<{
//         id: string,
//         title: Text
//     }>
// }

// export interface Group {
//     options: Array<string>
// }

// export interface Media {
//     link: string,
//     caption: Text
// }

// export interface Link {
//     body: string
// }

export interface List {
    header?: Text,
    footer?: Text,
    body: Text,
    actionTitle: Text,
    options: Array<{
        id: string,
        title: Text,
        description?: Text
    }>
}

export interface Location {
    latitude: string,
    longitude: string,
    name: Text,
    address: Text
}

export interface Replies {
    header?: Text,
    body: Text,
    options: Array<{
        id: string,
        title: Text
    }>
}