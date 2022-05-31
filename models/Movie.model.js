const mongoose = require('mongoose')
const Celebrity = require('./Celebrity.model')

const movieModel = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{type: mongoose.Schema.Types.ObjectId, ref: Celebrity}]
})

const Movie = mongoose.model('Movie', movieModel)

module.exports = Movie