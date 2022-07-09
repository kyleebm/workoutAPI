const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/login', (req, res) => {
  res.send('login')
})

router.post('/login', (req, res) => {
  const newUser = User(req.body)
  console.log(newUser)
})

module.exports = router
