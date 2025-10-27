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
    origin: ['http://localhost:3000', 'https://esme-seven.vercel.app'],
    credentials: true,
}));


app.use(('/api/applicants'), applicantsPath)
app.use(('/api/events'), eventsPath)
app.use(('/api/autherize'), autherizationPath)


app.get('/', (req, res) => {
    res.send('API is running...')
})


const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Server is running...');
})

module.exports = app;