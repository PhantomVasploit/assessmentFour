const Joi = require('joi')


module.exports.noteSchema = Joi.object({
    title: Joi.string()
    .required()
    .min(3)
    .max(30),
    content: Joi.string().required().min(3).max(100)
})