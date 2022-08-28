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

// session setup
const session = require('express-session')
const sessionConfig = {
  secret: 'willbeabettersecret',
  resave: 'false',
  saveUnitialized: 'true',
  cookie: {
    httpOnly: true,
    expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}
app.use(session(sessionConfig))

// passport setup
const User = require('./models/users')
const passport = require('passport')
const LocalStrategy = require('passport-local')
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

// routes
const userRoutes = require('./routes/users')
app.use('/register', userRoutes)

const workoutRoutes = require('./routes/workouts')
app.use('/workouts', workoutRoutes)

//set up error handler
const ExpressError = require('./utils/ExpressError')
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'something went wrong' } = err
  res.status(statusCode).send(message)
})
//add port
app.listen(3000, () => {
  console.log('APP IS LISTENING ON PORT 3000')
})
