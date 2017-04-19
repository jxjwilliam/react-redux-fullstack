const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({

    text: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Todo', todoSchema)