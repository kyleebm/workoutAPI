const express = require('express')
const router = express.Router()

//imports for models
const Workout = require('../models/workouts')

router.get('/workouts', (req, res) => {
  res.send('all workouts')
})

router.get('/workouts/:id', async (req, res) => {
  const { id } = req.params
  const workout = await Workout.findById(id)
  console.log(workout)
  res.send(workout)
  //res.redirect('/workout/:id)
})

router.post('/workouts/new', async (req, res) => {
  const newWorkout = Workout(req.body)
  await newWorkout
    .save()
    .then(
      console.log(newWorkout)
      //res.redirect('/dashboard') go to the home page after saving)
    )
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
