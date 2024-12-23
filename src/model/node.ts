import { string } from "joi"

const Mongoose = require("mongoose")
const Schema = Mongoose.Schema

const Node = new Schema({
    projectName: String,
    id: String,
    type: String,
    raw: String,
    processed: Object,
    searchableInternalIds: String,
    tags: { type: [String], default: [] },
    internal_ids: String,
    createdAt: { type: Number, default: Date.now() }
})

module.exports = new Mongoose.model("node", Node, "node")