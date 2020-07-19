//Degree Data Schema Declaration
//Last Edited: Alec Xu -- July 19

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