const Workout  = require('../models/workouts')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const catchAsync = require('../utils/catchAsync')


const getAllWorkouts = catchAsync(async (req, res, next) => {
    //console.log(req.query, req.user)
    const {muscleGroup, name, sets, reps, createdBy, sort, fields, seeAllWorkouts} = req.query
    const queryObject = {}
    
    //either show all workouts in database or just the ones made by user    
    if(!seeAllWorkouts){
       queryObject.createdBy = req.user.userId
    }
    
    

    if(muscleGroup){
      queryObject.muscleGroup = muscleGroup
    }    

    if(name){
      queryObject.name = {$regex : name, $options: 'i'} 
      // using mongo operators to search for case insensitive regex expression of name 
    }
    
    

    let result = Workout.find(queryObject)

    if(sort){
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    }
    else{
      result = result.sort('createdAt')
    }

    if(fields){
      //changes the object properties that the user can get as a result from our api
      const fieldList = fields.split(',').join(' ')
      result = result.select(fieldList)
    }

    const Workouts = await result
    res.status(StatusCodes.OK).json({Workouts, count: Workouts.length})
    //.render('workouts', { allWorkouts })
  })


const createWorkout = catchAsync(async (req, res, next) => {
    req.body.workout.createdBy = req.user.userId
    const newWorkout = new Workout(req.body.workout)
    // console.log(newWorkout)
    await newWorkout.save()
    res.status(StatusCodes.CREATED)
       .json({newWorkout})
       //.redirect(`/workouts/${newWorkout._id}`) // go to the home page after saving
  })

const createWorkoutForm = (req,res)=>{res.status(StatusCodes.OK).render('../views/workouts/new')}

const getWorkout = catchAsync(async (req, res) => {
      
    const { user: { userId}, params:{id:workoutId} } = req
    const workout = await Workout.findOne({_id: workoutId, createdBy:userId})
    
    res.status(StatusCodes.OK)
       .json(workout)
       //.render('workouts/edit', { workout })
  })

const updateWorkout = catchAsync( async (req,res) =>{
   
    const {
          user:{userId}, 
          params: {id: workoutId}, 
          body:{name, sets, reps, muscleGroup}
        } =req


    if(name===""||reps ==="" || sets==="" || muscleGroup===""){
        throw new BadRequestError('fields cannot be empty')
    }

    
    const workout = await Workout.findByIdAndUpdate({
        _id:workoutId, 
        createdBy:userId},req.body,
     {
        runValidators: true,
        new: true,
      })

    if(!workout){
        throw new NotFoundError(`No workout with Id ${workoutId}`)
    }
    res.status(StatusCodes.OK).json({workout})
    //.redirect(`/workouts/${workout.id}`)


})

const deleteWorkout = catchAsync(async (req, res) => {
    const { user:{userId}, params:{id:workoutId} } = req
    const deletedWorkout = await Workout.findByIdAndRemove({_id : workoutId, createdBy: userId})
    
    //res.redirect('/workouts')
    if(!deletedWorkout){
      throw new NotFoundError(`No workout with Id ${workoutId}`)
    }

    const remainingWorkouts = await Workout.find({createdBy: userId})
    res.status(StatusCodes.OK).json({remainingWorkouts})
  })






module.exports = {
    getAllWorkouts, 
    createWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    createWorkoutForm
    
}