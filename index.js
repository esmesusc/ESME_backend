const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')

const connectDB = require('./db')

// Import routes
const applicantsPath = require('./routes/applicantsRoute')
const eventsPath = require('./routes/eventsRoute')
const autherizationPath = require('./middleware/accessAuth')


connectDB()

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use(cors({
    origin: ['http://localhost:3000', 'https://esme-seven.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.use('/api/applicants', applicantsPath)
app.use('/api/events', eventsPath)
app.use('/api/autherize', autherizationPath)


app.get('/', (req, res) => {
    res.send('API is running...')
})


const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Server is running...');
})

module.exports = app;