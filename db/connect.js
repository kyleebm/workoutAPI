// set up mongoose
const mongoose = require('mongoose')

const connectDB = (url) => {
    console.log('DatabaseConnected')

    return mongoose
    .connect( url )
}

module.exports = connectDB