const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number
    }

})

var movies = mongoose.model('movieDetails', movieSchema, 'movieDetails')

module.exports = movies