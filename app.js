require('express-async-errors')

// set up express
const express = require('express')
const app = express()

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


// lets us access form data
//app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// security
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "workoutbuddyapp.com*"],
      "style-src": null,
    },
  })
);


// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

//set up method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//set up paths for views directory
app.set('view engine', 'ejs')
const path = require('path')
app.set('views', path.join(__dirname, '/views'))

//set up favicon
const favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname  ,"public/" + "favicon.ico")))

//connectDb
require('dotenv').config({path:__dirname+`/.env`})
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')



// routes

const homeRoutes = require('./routes/home')
app.use('/', homeRoutes)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const userRoutes = require('./routes/users')
app.use('/api/v1/auth', userRoutes)

const workoutRoutes = require('./routes/workouts')
app.use('/api/v1/workouts', authenticateUser, workoutRoutes)

// set up error handler
const errorHandlerMiddleware = require('./middleware/errorHandler')
const BadRequestError = require('./errors/badRequest')
const { dirname } = require('path')

app.use('*', (req, res) => {
  throw new BadRequestError('Page Not Found')
})

app.use((err, req, res, next) => {
  console.log(err)
  const { statusCode = 500, message = 'something went wrong' } = err
  res.status(statusCode).json({statusCode, message})
  //res.status(statusCode).render('errors', {statusCode, message})
})



const port = process.env.PORT || 3000

const dbAddress = process.env.MONGO_URI ||'mongodb://localhost:27017/workoutAPI'  

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
