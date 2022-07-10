const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/login', (req, res) => {
  res.send('login')
})

router.post('/login', async (req, res) => {
  const newUser = User(req.body)
  await newUser.save()
  console.log(newUser)
  //res.redirect('/dashboard') go to the home page after saving
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
