const { Router } = require('express')
const {
    newApplicant,
    getAllApplicants,
    getSingleApplicant,
    deleteSingleApplicant,
    updateApplicantStatus
} = require('../controllers/applicantsController')


const router = Router()

router.route('/').get(getAllApplicants)
                .post(newApplicant)

router.route('/:id').get(getSingleApplicant)
                    .delete(deleteSingleApplicant)
                    .put(updateApplicantStatus)


module.exports = router