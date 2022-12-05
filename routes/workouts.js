const express = require('express')
const router = express.Router()

const {getAllWorkouts,createWorkout, getWorkout, updateWorkout, deleteWorkout, createWorkoutForm} = require('../controllers/workouts')

router.route('/new').post(createWorkout).get(createWorkoutForm)

router.route('/:id').get(getWorkout).patch(updateWorkout).delete(deleteWorkout)

router.route('/').get(getAllWorkouts)


module.exports = router
