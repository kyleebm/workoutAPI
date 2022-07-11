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
  //res.redirect(/workout/:id)
})

router.get('/workouts/:id/edit', async (req, res) => {
  const { id } = req.params
  const workout = await Workout.findById(id)
  console.log(workout)
  res.send(' edit post')
})

router.put('/workouts/:id', async (req, res) => {
  const { id } = req.params
  const newWorkout = req.body
  const workout = await Workout.findByIdAndUpdate(id, newWorkout, {
    runValidators: true,
    new: true,
  })
  console.log(workout)
  res.send('put request')
})

router.delete('/workouts/:id', async (req, res) => {
  const { id } = req.params
  const deletedWorkout = await Workout.findByIdAndDelete(id)
  console.log(deletedWorkout)
  //res.redirect(workouts)
  res.send('delete route')
})

module.exports = router
