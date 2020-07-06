if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 3000

// mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.DEGREE_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())

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