const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
  .then(db => console.log('DB is connected'))
  .catch((err) => console.log(err.message))
