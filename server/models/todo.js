const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({

    description: {
        type: String,
        default: ''
    },
    isDone: {
        type: Boolean,
        default: false,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Todo', todoSchema)