const express = require('express')
const router = express.Router()

router.get('/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/signup', (req, res) => {
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
    res.send('ok')
  }
})

module.exports = router
