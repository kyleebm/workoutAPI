const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
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
  createdBy:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'please provide author']
  }
},{timestamps:true})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
