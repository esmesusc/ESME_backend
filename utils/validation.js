const Joi = require('joi')


const validateNewApplicant = (obj) => {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        faculty: Joi.string().required().trim(),
        currentYear: Joi.string().required().trim(),
        department: Joi.string().required().trim(),
        gradYear: Joi.string().required().trim(),
        birthDate: Joi.date().required(),
        nationality: Joi.string().required().trim(),
        governorate: Joi.string().trim(),
        committee: Joi.string().required().trim(),
        email: Joi.string().required().trim(),
        phone: Joi.string().required().trim(),
        university: Joi.string().required().trim(),
    })
    return schema.validate(obj)
}


const validateNewEvent = (obj) => {
    const schema = Joi.object({
        title: Joi.string().required().trim(),

        description: Joi.string().required().trim(),
        images: Joi.array()
    })
    return schema.validate(obj)
}


module.exports = {
    validateNewApplicant,
    validateNewEvent
}