const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

userSchema.methods.encryptPassword = async (password) => {
  const salt = bcrypt.getSalt(10)
  const hash = bcrypt.hash(password, salt)
  return hash
}

userSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)