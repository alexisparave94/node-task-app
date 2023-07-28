const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

router.get('/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/signup', async (req, res) => {
  const { name, email, password, confirm_password } = req.body
  const errors = []
  if(!name) errors.push({ message: 'Please write a name' }) 
  if(!email) errors.push({ message: 'Please write a email' })
  if(password.length < 4 ) errors.push({ message: 'Password must have at least 6 characters' }) 
  if(password != confirm_password) errors.push({ message: 'Password does not match' })
  
  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      email,
      password,
      confirm_password
    })
  } else {
    const user = await User.findOne({ email })
    if(user) {
      errors.push({ message: 'The email is already registered' })
      return res.render('users/signup', { 
        errors, name, email, password, confirm_password
       })
    }
    const newUser = new User({ name, email, password })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    req.flash('success_msg', 'User Created Successfully')
    res.redirect('/tasks')
  }
})

router.get('/signin', (req, res) => {
  res.render('users/signin')
})

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/tasks',
  failureRedirect: '/users/signin',
  failureFlash: true
}))

router.get('/logout', (req , res) => {
  req.logout(() => {})
  res.redirect('/')
})

module.exports = router
