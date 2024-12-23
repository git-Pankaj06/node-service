require("dotenv").config()
const BodyParser = require("body-parser")
const Express = require("express")
const DB = require("./lib/db")
const App = Express()
const General = require("./router/general")
const Project = require("./router/project")
const Node = require("./router/node")
const Type = require("./router/type")
const PORT = 3002
const Cors = require("cors")

// Connecting to DB first and then starting server
DB(process.env.DB_PATH, process.env.DB_NAME)
.then(result => {
    console.log(result)
    
    App
    .use(Cors())
    .use(BodyParser.json())
    .use("/", General)
    .use("/project", Project) 
    .use("/project", Node) 
    .use("/type", Type)
    .listen(PORT, () => {
        console.log(`Server is running at Port: ${PORT}`)
    })
})
.catch(console.log)


