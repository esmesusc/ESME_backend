const mongoose = require('mongoose')
require('dotenv').config()

// Serverless-friendly MongoDB connection with caching to avoid reconnects
// across Vercel function invocations.
let cached = global._mongoCache || (global._mongoCache = { conn: null, promise: null })

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn
    }

    if (!process.env.MONGO_URI) {
        console.warn('MONGO_URI is not defined. Skipping MongoDB connection.')
        return null
    }

    if (!cached.promise) {
        const opts = {
            // Mongoose 6+ manages these options internally; keep minimal options
            // to avoid passing unsupported flags in newer versions.
            retryWrites: true,
            w: 'majority'
        }
        cached.promise = mongoose.connect(process.env.MONGO_URI, opts)
            .then((mongooseInstance) => {
                return mongooseInstance
            })
    }

    try {
        cached.conn = await cached.promise
        console.log('MongoDB connected successfully')
        return cached.conn
    } catch (err) {
        console.error('MongoDB connection error:', err)
        // Don't exit the process in serverless environment — throw so the caller can handle it.
        throw err
    }
}

module.exports = connectDB