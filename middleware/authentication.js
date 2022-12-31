const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authMiddleware = async (req, res, next) => {
    //check header 
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication  still invalid')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to the workout
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch{
        throw new UnauthenticatedError(`Authentication invalid`)
    }
}

module.exports = authMiddleware