// Set up mongoose connection
const mongoose = require('mongoose')
let mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
let db = mongoose.connection

module.exports = mongoose, db