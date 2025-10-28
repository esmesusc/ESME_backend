const {connect} = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
            w: 'majority'
        })
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

module.exports = connectDB