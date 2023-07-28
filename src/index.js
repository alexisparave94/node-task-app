const express = require('express')
const path = require('path')
const expHbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const indexRoutes = require('./routes/index.routes')
const taskRouter = require('./routes/tasks.routes')
const userRouter = require('./routes/users.routes')
const flash = require('connect-flash')
const passport = require('passport')

//Initializations
const app = express()
require('./config/db')
require('./config/passport')

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
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use(indexRoutes)
app.use('/tasks', taskRouter)
app.use('/users', userRouter)

// Server listening
app.listen(process.env.PORT || 3000, () => {
  console.log('Server on port', process.env.PORT || 3000)
})