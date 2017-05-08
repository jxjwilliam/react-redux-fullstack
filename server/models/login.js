const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loginSchema = new Schema({
  account: {
    type: String
  },
  pass: {
    type: String
  },
  counts: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Login', loginSchema);