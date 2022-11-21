const {Workout}  = require('../schemas')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const catchAsync = require('../utils/catchAsync')


const getAllWorkouts = catchAsync(async (req, res, next) => {
    const allWorkouts = await Workout.find({})
    res.status(StatusCodes.OK).json({allWorkout, count: workout.length}).render('workouts', { allWorkouts })
  })


const createWorkout = catchAsync(async (req, res, next) => {
    const newWorkout = new Workout(req.body.workout)
    await newWorkout.save()
    // res.send('made a new workout')
    res.status(StatusCodes.OK)
       .json({newWorkout})
       .redirect(`/workouts/${newWorkout._id}`) // go to the home page after saving
  })

const getWorkout = catchAsync(async (req, res) => {
    const { user: {userId}, params:{id:jobId} } = req
    const workout = await Workout.findById(id)
    //console.log(workout)
    res.status(StatusCodes.CREATED)
       .json(workout)
       .render('workouts/edit', { workout })
  })

const updateWorkout = catchAsync( async (req,res) =>{
    const {user:{userId}, params: {id}, body:{name, sets, reps}} =req
    // const { id } = req.params
    // const newWorkout = { ...req.body.workout }
    // const createdBy = req.user.userId 

    if(name===""||reps ==="" || sets===""){
        throw new BadRequestError('fields cannot be empty')
    }

    
    const workout = await Workout.findByIdAndUpdate(
        id, 
        newWorkout, 
        createdBy,
     {
        runValidators: true,
        new: true,
      })
    if(!workout){
        throw new NotFoundError(`No workout with Id ${id}`)
    }
    res.status(StatusCodes.OK).json({workout}).redirect(`/workouts/${workout.id}`)


})

const deleteWorkout = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deletedWorkout = await Workout.findByIdAndDelete(id)
    //console.log(deletedWorkout)
    res.redirect('/workouts')
    //res.send('delete route')
  })





module.exports = {
    getAllWorkouts, 
    createWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    
}