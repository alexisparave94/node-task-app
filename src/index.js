const express = require('express')
const path = require('path')
const expHbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const indexRoutes = require('./routes/index.routes')
const notesRoutes = require('./routes/notes.routes')

const app = express()
require('./config/db')

//Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', expHbs.engine({
  defaultLayout: 'main',
  layoutDir: path.join(app.get('views'), 'layouts'),
  partialDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}))

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use(indexRoutes)
app.use('/notes', notesRoutes)

// Server listening
app.listen(process.env.PORT || 3000, () => {
  console.log('Server on port', process.env.PORT || 3000)
})