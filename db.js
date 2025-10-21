const {connect} = require('mongoose')
require('dotenv').config()


const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB