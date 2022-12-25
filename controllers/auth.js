const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const catchAsync = require('../utils/catchAsync')



const register = catchAsync(async (req,res) =>{

    const user = await User.create({...req.body})
    token = user.createJWT()
    
    res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})
})

const login =  catchAsync(async (req,res) =>{
    const { email, password } =req.body
    if(!email||!password){
        throw new BadRequestError('please enter email and password')
    }
    
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('invalid credentials')
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('invalid credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})
})


module.exports = {
    register,
    login,
}