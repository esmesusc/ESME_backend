const { Schema, model } = require('mongoose')


const applicantSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    university: {
        type: String, 
        required: true
    },
    faculty: {
        type: String, 
        required: true
    },
    currentYear: {
        type: String, 
        required: true
    },
    department: {
        type: String, 
        required: true
    },
    gradYear: {
        type: String, 
        required: true
    },
    birthDate: {
        type: String, 
        required: true
    },
    nationality: {
        type: String, 
        required: true
    },
    governorate: {
        type: String,
    },
    committee: {
        type: String, 
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'Interviewing', 'Fired'],
        default: 'Pending'
    }
}, { timestamps: true })

const applicantModel = model('Applicant', applicantSchema)
module.exports = applicantModel