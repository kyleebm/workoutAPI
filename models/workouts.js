const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide workout name'],
  },
  sets: {
    type: Number,
    required: [true, 'please provide number of sets'],
  },
  reps: {
    type: Number,
    required: [true, 'please provide number of reps'],
  },
  createdBy:{
    type: mongoose.Types.ObjectId,
    ref:'User',
    required: [true, 'please provide author']
  }
},{timestamps:true})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
