if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config()
}
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const MONGODB_URI = 'mongodb+srv://alecxu:abcdefg123@cluster0.xyl0w.mongodb.net/<dbname>?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

// mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(MONGODB_URI || process.env.DEGREE_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/courseplanner/build'))

        app.get('*', function(req, res) {
                res.sendFile(path.join(__dirname, 'client/courseplanner/build', 'index.html'));
}

const courseRouter = require('./routes/courses')
app.use('/courses', courseRouter)

const degreeRouter = require('./routes/degrees')
app.use('/degrees', degreeRouter)

app.listen(PORT, () => {
        console.log('server started')
})

app.get('/', (req, res) => {
        res.send('Hello World')
})