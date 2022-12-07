const Workout = require('./models/workouts')
mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/workoutAPI', { useNewUrlParser: true })
  .then(() => {
    console.log(' MONGO CONNECTION OPEN!!')
  })
  .catch((err) => {
    console.log('OH NO MONGO CONNECTION ERROR', err)
  })

const seedWorkouts = [
  {
    name: 'shoulder raise',
    sets: 3,
    reps: 5,
  },

  {
    name: 'Bench press',
    sets: 3,
    reps: 5,
  },

  {
    name: 'tri pulldown',
    sets: 3,
    reps: 15,
  },

  {
    name: 'squats',
    sets: 5,
    reps: 5,
  },

  {
    name: 'bent over rows',
    sets: 3,
    reps: 15,
  },

  {
    name: 'cable bicep curls',
    sets: 3,
    reps: 15,
  },
]

const seedDb = async () => {
  await Workout.deleteMany({})
  await Workout.insertMany(seedWorkouts)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    })
}

seedDb().then(() => {
  mongoose.connection.close()
})
