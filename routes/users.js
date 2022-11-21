const express = require('express')
const router = express.Router()


//import models
const { register,login } = require('../controllers/auth')

router.get('/register', (req, res) => {
  // res.send('register')
  res.render('../views/users/register')
})

router.post(
  '/register',
  register
)

router.post(
  '/login',
  login
)

module.exports = router
