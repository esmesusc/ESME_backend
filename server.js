const express = require('express')
require('dotenv').config()
const cors = require('cors')

const connectDB = require('./db')


const applicantsPath = require('./routes/applicantsRoute')
const eventsPath = require('./routes/eventsRoute')
const autherizationPath = require('./middleware/accessAuth')


connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:4000'],
    credentials: true
}))


app.use(('/applicants'), applicantsPath)
app.use(('/events'), eventsPath)
app.use(('/autherize'), autherizationPath)


const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Server is running...');
})