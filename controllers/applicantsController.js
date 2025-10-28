const Applicant = require('../models/Applicant');
const { validateNewApplicant } = require('../utils/validation');


// Create a new applicant
const newApplicant = async (req, res) => {
    try {
        const { error } = validateNewApplicant(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const applicant = new Applicant(req.body);
        await applicant.save();
        res.status(201).json({ success: true, message: 'Application sent successfully', applicant });
    } catch (error) {
        console.error('Error creating applicant:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
}


// Get all applicants
const getAllApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find();
        res.status(200).json({ success: true, body: applicants });
    } catch (error) {
        console.error('Error creating applicant:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
} 


// Get single applicant
const getSingleApplicant = async (req, res) => {
    try {
        const { id } = req.params;
        const applicant = await Applicant.findById(id);
        if (!applicant) {
            return res.status(404).json({ success: false, message: 'Applicant not found' });
        }
        res.status(200).json({ success: true, body: applicant });
    } catch (error) {
        console.error('Error creating applicant:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
}    


// Delete single applicant
const deleteSingleApplicant = async (req, res) => {
    try {
        const { id } = req.params;
        const applicant = await Applicant.findById(id);
        if (!applicant) {
            return res.status(404).json({ success: false, message: 'Applicant not found' });
        }
        await Applicant.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Applicant was deleted successfully' });
    } catch (error) {
        console.error('Error creating applicant:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
}        


// Delete single applicant
const updateApplicantStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body
        const applicant = await Applicant.findById(id);
        if (!applicant) {
            return res.status(404).json({ success: false, message: 'Applicant not found' });
        }
        applicant.status = status
        await applicant.save()
        res.status(200).json({ success: true, message: 'Applicant was deleted successfully' });
    } catch (error) {
        console.error('Error creating applicant:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
}        


module.exports = {
    newApplicant,
    getAllApplicants,
    getSingleApplicant,
    deleteSingleApplicant,
    updateApplicantStatus
}