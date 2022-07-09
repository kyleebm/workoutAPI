const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: 'string',
  email: 'string',
  password: 'string',
})

module.exports = mongoose.model('User', userSchema)
