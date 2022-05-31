const mongoose = require('mongoose')

const celebrityModel = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String
})

const Celebrity = mongoose.model('Celebrity', celebrityModel)

module.exports = Celebrity