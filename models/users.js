const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: 'string',
  email: 'string',
  password: 'string',
})

const User = mongoose.model('User', userSchema)

module.exports = User
