const { Router } = require('express')
const {
    newEvent,
    getAllEvents,
    getSingleEvent,
    deleteSingleEvent
} = require('../controllers/eventsController')


const router = Router()

router.route('/').get(getAllEvents)
                .post(newEvent)

router.route('/:id').get(getSingleEvent)
                    .delete(deleteSingleEvent)


module.exports = router