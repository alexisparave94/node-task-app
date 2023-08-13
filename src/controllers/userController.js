const User = require('../models/User')
const passport = require('passport')
const { validationResult } = require('express-validator');

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

const singup = async (req, res, netx) => {
  const { name, email, password, confirm_password } = req.body
  const errors = []
  const result = validationResult(req)
  
  if (result.isEmpty()){
    if(password != confirm_password) {
      errors.push({ msg: 'Password does not match' })
    } else {
      const user = await User.findOne({ email })
      if(user) {
        errors.push({ msg: 'The email is already registered' })
        return res.render('users/signup', { 
          errors, name, email, password, confirm_password
        })
      }
      const newUser = new User({ name, email, password })
      newUser.password = await newUser.encryptPassword(password)
      await newUser.save()
      return netx()
    }
  }

  res.render('users/signup', {
    errors: [...errors, ...result.array()],
    name,
    email,
    password,
    confirm_password
  })
}

const newSingin = (req, res) => {
  res.render('users/signin')
}

const logout = (req, res) => {
  req.logout(() => {})
  res.redirect('/')
}

module.exports = {
  authenticateSignup,
  authenticateSignin,
  newSingup,
  singup,
  newSingin,
  logout
}