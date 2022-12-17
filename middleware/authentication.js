const User = require('../models/users')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async (req, res, next) => {
    //check header 
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_Secret)
        //attach the user to the workout
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch{
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth