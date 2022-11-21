const express = require('express')
const router = express.Router()

//imports for models
const Workout = require('../models/workouts')

//import error handler
const catchAsync = require('../utils/catchAsync')
const  {BadRequestError}= require('../errors')

// import validation
const { workoutSchema } = require('../schemas')

const {getAllWorkouts,createWorkout, getWorkout, updateWorkout, deleteWorkout} = require('../controllers/workouts')

router.get('/',getAllWorkouts)

router.get('/new', (req, res) => {
  res.render('workouts/new')
})

router.post('/new',createWorkout)

router.get('/:id', getWorkout)

router.patch('/:id', updateWorkout)

router.delete(
  '/:id',deleteWorkout)

module.exports = router
