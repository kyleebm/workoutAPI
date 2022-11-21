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
// lets us access form data
app.use(express.urlencoded({ extended: true }))

//set up method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//set up paths for views directory
app.set('view engine', 'ejs')
const path = require('path')
app.set('views', path.join(__dirname, '/views'))


// routes
const userRoutes = require('./routes/users')
app.use('/', userRoutes)

const workoutRoutes = require('./routes/workouts')
app.use('/workouts', workoutRoutes)

//set up error handler
const {BadRequestError} = require('./errors')
app.all('*', (req, res, next) => {
  next( new BadRequestError('Page Not Found'))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'something went wrong' } = err
  res.status(statusCode).send(message)
})
//add port
app.listen(3000, () => {
  console.log('APP IS LISTENING ON PORT 3000')
})
