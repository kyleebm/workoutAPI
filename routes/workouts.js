const express = require('express')
const router = express.Router()

//imports for models
const Workout = require('../models/workouts')

router.get('/workouts', (req, res) => {
  res.send('all workouts')
})

router.get('/workouts/new', (req, res) => {
  res.send('a new workout')
})

router.post('/workouts/new', async (req, res) => {
  const newWorkout = new Workout(req.body)
  await newWorkout.save()
  console.log(newWorkout)
  res.send('made a new workout')
  //res.redirect('/workouts')  go to the home page after saving
})

router.get('/workouts/:id', async (req, res) => {
  const { id } = req.params
  const workout = await Workout.findById(id)
  console.log(workout)
  res.send(workout)
  //res.redirect('/workout/:id)
})

module.exports = router
