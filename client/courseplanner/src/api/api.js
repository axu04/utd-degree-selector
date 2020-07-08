import axios from 'axios'

const api = axios.create({
        baseURL: 'https://utd-degree-selector.herokuapp.com/'
        // baseURL: 'mongodb+srv://alecxu:Zsqwl58Ldo2prdHY@cluster0.xyl0w.mongodb.net/<dbname>?retryWrites=true&w=majority'
})

export const insertCourse = courseData => api.post('/api/courses', courseData)
export const getAllCourses = () => api.get('/api/courses')
export const deleteCourse = id => api.delete(`/api/courses/${id}`)
export const getCourseById = id => api.get(`/apicourses/${id}`)

export const insertDegree = degreeInfo => api.post('/api/degrees', degreeInfo)
export const getAllDegrees = () => api.get('/api/degrees')
export const deleteDegree = id => api.delete(`/api/degrees/${id}`)
export const getDegreeById = id => api.get(`/api/degrees/${id}`)

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