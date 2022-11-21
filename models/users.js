const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const UserSchema = new Schema({
  name : {
      type: String, 
      required: [true, 'please provide name'],
      minlength: 2,
      maxlength: 50,
  },
  email : {
      type: String, 
      required: [true, 'please provide email'],
      //got regex from stack overflow
      match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
          'Please provide email ie: email@example.com'],
      unique: true,
  },
  password : {
      type: String, 
      required: [true, 'please provide password'],
      minlength: 2,
  },
})

UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password= await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({userId:this._id, name: this.name}, process.env.JWT_SECRET , {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const User = mongoose.model('User', UserSchema)

module.exports = mongoose.model('User', UserSchema)
