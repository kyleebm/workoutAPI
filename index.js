// set up express
const express = require('express')
const app = express()

// set up mongoose
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/workoutAPI', { useNewUrlParser: true })
  .then(() => {
    console.log(' MONGO CONNECTION OPEN!!')
  })
  .catch((err) => {
    console.log('OH NO MONGO CONNECTION ERROR', err)
  })

app.get('/login', (req, res) => {
  res.send('hello')
})

app.listen(3000, () => {
  console.log('APP IS LISTENING ON PORT 3000')
})
