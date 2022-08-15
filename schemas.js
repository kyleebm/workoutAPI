const Joi = require('joi')

module.exports.workoutSchema = Joi.object({
  workout: Joi.object({
    name: Joi.string().required(),
    reps: Joi.number().integer().min(0).required(),
    sets: Joi.number().integer().min(0).required(),
  }).required(),
})
