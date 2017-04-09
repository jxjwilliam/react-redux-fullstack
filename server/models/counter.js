const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    counter: {
        type: Number,
        default: 8
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Counter', counterSchema);