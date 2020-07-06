const mongoose = require('mongoose')

const degreeSchema = mongoose.Schema({
        degreeTitle: {
                type: String,
                required: true
        },
        degreeData: {
                type: Array,
                required: true
        }
})

module.exports = mongoose.model('Degree', degreeSchema)