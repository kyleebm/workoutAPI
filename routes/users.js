const express = require('express')
const router = express.Router()

//import error handler
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

//import models
const User = require('../models/users')

router.get('/register', (req, res) => {
  // res.send('register')
  res.render('../views/users/register')
})

router.post(
  '/register',
  catchAsync(async (req, res) => {
    const { name, email, password } = req.body

    const user = new User({ username: name, email: email })
    const registeredUser = await User.register(user, password)
    console.log(registeredUser)
    res.redirect('/workouts')
  })
)

module.exports = router
