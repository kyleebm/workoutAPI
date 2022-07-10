const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
