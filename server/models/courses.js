const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
        courseLabel: {
                type: String,
                required: true
        },
        courseTitle: {
                type: String,
                required: true
        }, 
        courseTopic: {
                type: String,
                required: true
        },
        semesterHours: {
                type: String,
                required: true
        }, 
        requirements: {
                type: String,
                required: true
        }
})

module.exports = mongoose.model('Course', courseSchema)