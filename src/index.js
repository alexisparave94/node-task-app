import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'
import methodOverride from 'method-override'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'

import indexRoutes from './routes/index.routes.js'
import taskRouter from './routes/tasks.routes.js'
import userRouter from './routes/users.routes.js'

//Initializations
const app = express()

import './config/db.js'
import './config/passport.js'

//Settings
app.set('views', path.join(process.cwd(), 'src','views'))
app.engine('.hbs', engine({
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
app.use(express.static(path.join(process.cwd(), 'src', 'public')))

//Routes
app.use(indexRoutes)
app.use('/tasks', taskRouter)
app.use('/users', userRouter)

// Server listening
app.listen(process.env.PORT || 3000, () => {
  console.log('Server on port', process.env.PORT || 3000)
})