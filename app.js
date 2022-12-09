// set up express
const express = require('express')
const app = express()

require('dotenv').config()


// lets us access form data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//set up method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


const authMiddleware = require('./middleware/authentication')


//set up paths for views directory
app.set('view engine', 'ejs')
const path = require('path')
app.set('views', path.join(__dirname, '/views'))

//connectDb

const connectDB = require('./db/connect')

// routes
const userRoutes = require('./routes/users')
app.use('/api/v1/auth', userRoutes)

const homeRoutes = require('./routes/home')
app.use('/api/v1/home', homeRoutes)

const workoutRoutes = require('./routes/workouts')
app.use('/api/v1/workouts', authMiddleware, workoutRoutes)

// set up error handler
const {BadRequestError} = require('./errors')
app.use('*', (req, res) => {
  throw new BadRequestError('Page Not Found')
})

app.use((err, req, res, next) => {
  console.log(err)
  const { statusCode = 500, message = 'something went wrong' } = err
  res.status(statusCode).render('errors', {statusCode, message})
})



const port = process.env.PORT || 3000
const dbAddress = 'mongodb://localhost:27017/workoutAPI'  

const start = async () => {
  try {
    await connectDB(dbAddress)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
