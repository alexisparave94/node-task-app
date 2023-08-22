import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user_id: { type:String, required: true }
})

export default mongoose.model('Task', noteSchema)