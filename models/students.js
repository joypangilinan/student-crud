const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    sid: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['regular', 'irregular'],
        required: true
    },
    level: {
        type: String,
        enum: ['f', 's', 'j', 'sn'],
        required: true,
    }

}, {
        timestamps: true
    })

var students = mongoose.model('Student', studentSchema)

module.exports = students