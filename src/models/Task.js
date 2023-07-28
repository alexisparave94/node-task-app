const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user_id: { type:String, required: true }
})

module.exports = mongoose.model('Task', noteSchema)