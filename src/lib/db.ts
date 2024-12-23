const Mongoose = require("mongoose")

module.exports = (path, name) => new Promise((resolve, reject) => {
    Mongoose.connect(path + name)
    
    Mongoose.connection.on("open", async function(){
        try {
            return resolve("DB is ready")
        }catch(err){
            return reject(err)
        }
    })

    Mongoose.connection.on("error", function(err){
        return reject(err)
    })
})

