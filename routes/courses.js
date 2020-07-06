const express = require('express')
const router = express.Router()
const Course = require('../models/courses')

//Getting all classes
router.get('/', async (req, res) => {
        try {
                const courses = await Course.find()
                res.send(courses)
        } catch (err) {
                res.status(500).json({ message: error.message })
        }
})

//Getting one class
router.get('/:id', getCourse, (req, res) => {
        res.send(res.course)
})

//Creating a class
router.post('/', (req, res) => {
        const newCourse = new Course({
                courseLabel: req.body.courseLabel,
                courseTitle: req.body.courseTitle,
                courseTopic: req.body.courseTopic,
                semesterHours: req.body.semesterHours,
                requirements: req.body.requirements
        })
        try {
                const addCourse = newCourse.save()
                res.status(201).json(addCourse)
        } catch (err) {
                res.status(400).json({ message: err.message })
        }
        
})

//Deleting a class 
router.delete('/:id', getCourse, async (req, res) => {
        try {
                await res.course.remove()
                res.json({ message: 'Course removed' })
        } catch (err) {
                res.status(500).json({ message: err.message })
        }
})

//geta course middleware function
async function getCourse(req, res, next) {
        let course
        try {
                course = await Course.findOne({ courseLabel: req.params.id})
                if (course === null) {
                        return res.status(404).json({ message: 'Cannot find course'})
                }
        } catch (err) {
                return res.status(500).json({ message: err.message })
        }

        res.course = course
        next()
}

module.exports = router