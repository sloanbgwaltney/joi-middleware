const Joi = require('@hapi/joi')

const validator = Joi.object({
    test: Joi.string().required()
})

module.exports = validator