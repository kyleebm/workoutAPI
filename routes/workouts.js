const express = require('express')
const router = express.Router()

//imports for models
const Workout = require('../models/workouts')

//import error handler
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

// import validation
const { workoutSchema } = require('../schemas')
const validateWorkout = (req, res, next) => {
  const { error } = workoutSchema.validate(req.body)
  if (error) {
    console.log(error.details)
    const msg = error.details.map((em) => em.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const allWorkouts = await Workout.find({})
    console.log(allWorkouts)
    res.render('workouts', { allWorkouts })
  })
)

router.get('/new', (req, res) => {
  res.render('workouts/new')
})

router.post(
  '/new',
  validateWorkout,
  catchAsync(async (req, res, next) => {
    const newWorkout = new Workout(req.body.workout)
    await newWorkout.save()
    console.log(newWorkout)
    // res.send('made a new workout')
    res.redirect(`/workouts/${newWorkout._id}`) // go to the home page after saving
  })
)

router.get(
  '/:id/edit',
  catchAsync(async (req, res, next) => {
    const { id } = req.params
    const workout = await Workout.findById(id)
    //console.log(workout)
    res.render('workouts/edit', { workout })
  })
)

router.get(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params
    const workout = await Workout.findById(id)
    //console.log(workout)
    //res.send(workout)
    res.render('workouts/show', { workout })
  })
)

router.put(
  '/:id',
  validateWorkout,
  catchAsync(async (req, res, next) => {
    const { id } = req.params
    const newWorkout = { ...req.body.workout }
    const workout = await Workout.findByIdAndUpdate(id, newWorkout, {
      runValidators: true,
      new: true,
    })
    //console.log(workout)
    res.redirect(`/workouts/${workout.id}`)
  })
)

router.delete(
  '/:id',
  catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deletedWorkout = await Workout.findByIdAndDelete(id)
    //console.log(deletedWorkout)
    res.redirect('/workouts')
    //res.send('delete route')
  })
)

module.exports = router
