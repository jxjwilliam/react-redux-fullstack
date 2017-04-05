//http://onlythepixel.com/2017/01/05/mongoose-mongodb-and-express/

const mongoose = require('mongoose')
const prettyjson = require('prettyjson');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/todos'

const db = {
    connect () {
        return mongoose.connect(DB_URI)
    },
    disconnect () {
        return mongoose.connection.close(() => {
            process.exit(0)
        })
    }
}

mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
    console.log(prettyjson.render('Mongoose connection open to ' + DB_URI))
})

mongoose.connection.on('disconnected', () => {
    console.log(prettyjson.render('Mongoose disconnected'))
})

mongoose.connection.on('error', (err) => {
    console.log(prettyjson.render(err))
})

process
    .on('SIGINT', db.disconnect)
    .on('SIGTERM', db.disconnect)

module.exports = db