const Event = require('../models/Event');
const { validateNewEvent } = require('../utils/validation');


// Add a new Event
const newEvent = async (req, res) => {
    try {
        const { images } = req.body
        const { error } = validateNewEvent(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        let cloudinaryResponse = null
        if(images) {
            cloudinaryResponse = images.map(async (img) => {
                const res=  await cloudinary.uploader.upload(img, { folder: "ESMEevents" })
                return {public_id: res?.public_id,
                        url: res?.secure_url}
            })
        }

        const event = new Event({...req.body, images: cloudinaryResponse ? await Promise.all(cloudinaryResponse) : []});
        await event.save();
        res.status(201).json({ success: true, message: 'Event created successfully', data: event });
    } catch (error) {
        console.error('Error creating Event:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
}


// Get all Events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ success: true, body: events });
    } catch (error) {
        console.error('Error creating Event:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
} 


// Get single Event
const getSingleEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, body: event });
    } catch (error) {
        console.error('Error creating Event:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
}    


// Delete single Event
const deleteSingleEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        if (event.images) {
            event.images.map(async (img) => {
                try {
                    await cloudinary.uploader.destroy(img.public_id)
                    console.log("deleted image from cloudinary")

                } catch (error) {
                    console.log("error deleting image from cloudinary", error)
                }
            })
        }
        await Event.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Event was deleted successfully' });
    } catch (error) {
        console.error('Error creating Event:', error);
        res.status(500).json({ message: 'Server error: ', error });
    }
}        


module.exports = {
    newEvent,
    getAllEvents,
    getSingleEvent,
    deleteSingleEvent
}