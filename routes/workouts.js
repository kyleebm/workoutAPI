const express = require('express')
const router = express.Router()

//imports for models
const Workout = require('../models/workouts')

function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e))
  }
}
router.get('/', async (req, res) => {
  const allWorkouts = await Workout.find({})
  console.log(allWorkouts)
  res.render('workouts', { allWorkouts })
})

router.get('/new', (req, res) => {
  res.render('workouts/new')
})

router.post('/new', async (req, res) => {
  const newWorkout = new Workout(req.body.workout)
  await newWorkout.save()
  console.log(newWorkout)
  // res.send('made a new workout')
  res.redirect(`/workouts/${newWorkout._id}`) // go to the home page after saving
})

router.get('/:id/edit', async (req, res) => {
  const { id } = req.params
  const workout = await Workout.findById(id)
  //console.log(workout)
  res.render('workouts/edit', { workout })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const workout = await Workout.findById(id)
  //console.log(workout)
  //res.send(workout)
  res.render('workouts/show', { workout })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const newWorkout = { ...req.body.workout }
  const workout = await Workout.findByIdAndUpdate(id, newWorkout, {
    runValidators: true,
    new: true,
  })
  //console.log(workout)
  res.redirect(`/workouts/${workout.id}`)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deletedWorkout = await Workout.findByIdAndDelete(id)
  //console.log(deletedWorkout)
  res.redirect('/workouts')
  //res.send('delete route')
})

module.exports = router
