import axios from 'axios'

const api = axios.create({
        baseURL: 'http://localhost:3000'
})

export const insertCourse = courseData => api.post('/courses', courseData)
export const getAllCourses = () => api.get('/courses')
export const deleteCourse = id => api.delete(`/courses/${id}`)
export const getCourseById = id => api.get(`/courses/${id}`)

export const insertDegree = degreeInfo => api.post('/degrees', degreeInfo)
export const getAllDegrees = () => api.get('/degrees')
export const deleteDegree = id => api.delete(`/degrees/${id}`)
export const getDegreeById = id => api.get(`/degrees/${id}`)

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

export default apis