const axios = require('axios')

const api = axios.create({
        baseURL: 'http://localhost:3000'
})

const insertCourse = courseData => api.post('/courses', courseData)
const getAllCourses = () => api.get('/courses')
const deleteCourse = id => api.delete(`/courses/${id}`)
const getCourseById = id => api.get(`/courses/${id}`)

const insertDegree = degreeInfo => api.post('/degrees', degreeInfo)
const getAllDegrees = () => api.get('/degrees')
const deleteDegree = id => api.delete(`/degrees/${id}`)
const getDegreeById = id => api.get(`/degrees/${id}`)

const apis = {
        insertCourse,
        getAllCourses,
        deleteCourse,
        getCourseById,
        insertDegree,
        getAllDegrees,
        deleteDegree,
        getDegreeById
}

module.exports = apis