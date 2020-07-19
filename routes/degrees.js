//Degree Data Storing/Retreiving
//Last Edited: Alec Xu -- July 19

const express = require('express')
const router = express.Router()
const Degree = require('../models/degrees')

//Get all degrees
router.get('/', async (req, res) => {
        try {
                const degrees = await Degree.find()
                res.send(degrees)
        } catch (err) {
                res.status(500).json({ message: error.message })
        }
})

//Get one degree
router.get('/:id', getDegree, (req, res) => {
        res.send(res.degree)
})

//Add a degree
router.post('/', (req, res) => {
        const newDegree = new Degree({ 
                degreeTitle: req.body.degreeTitle,
                degreeData: req.body.degreeData
        })
        try {
                const addDegree = newDegree.save()
                res.status(201).json(addDegree)
                console.log('degree added')
        } catch (err) {
                res.status(400).jason({ message: err.message })
        }
})

//Delete a degree
router.delete('/:id', getDegree, async (req, res) => {
        try {
                await res.degree.remove()
                res.json({ message: 'Degree removed' })
        } catch (err) {
                res.status(500).json({ message: err.message })
        }
})

//Get a degree middleware function
async function getDegree(req, res, next) {
        let degree
        try {
                degree = await Degree.findOne({ degreeTitle: req.params.id})
                if (degree === null) {
                        return res.status(404).json({ message: 'Cannot find degree'})
                }
        } catch (err) {
                return res.status(500).json({ message: err.message })
        }
        res.degree = degree
        next()
}

module.exports = router