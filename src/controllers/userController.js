import passport from 'passport'

import User from '../models/User.js'

const authenticateSignup = passport.authenticate('local', {
  successRedirect: '/tasks',
  failureRedirect: '/users/signup',
  failureFlash: true
})

const authenticateSignin = passport.authenticate('local', {
  successRedirect: '/tasks',
  failureRedirect: '/users/signin',
  failureFlash: true
}) 

const newSingup = (req, res) => {
  res.render('users/signup')
}

const singup = async (req, res, next) => {
  const { name, email, password } = req.body

  const newUser = new User({ name, email, password })
  newUser.password = await newUser.encryptPassword(password)
  await newUser.save()
  next()
}

const newSingin = (req, res) => {
  res.render('users/signin')
}

const logout = (req, res) => {
  req.logout(() => {})
  res.redirect('/')
}

export default {
  authenticateSignup,
  authenticateSignin,
  newSingup,
  singup,
  newSingin,
  logout
}