const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    dob: {
        type: Date
    },
    active: {
        type: Boolean,
        default: false,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
