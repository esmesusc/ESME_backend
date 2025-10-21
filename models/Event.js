const { Schema, model } = require('mongoose')


const eventSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description:{
        type: String, 
        required: true
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })


const eventmodel = model('Event', eventSchema)
module.exports = eventmodel