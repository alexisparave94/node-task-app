const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { body } = require('express-validator');
const User = require('../models/User')

router.get('/signup', userController.newSingup)

router.post('/signup',
  body('name').notEmpty(), 
  body('email').notEmpty().custom(async value => {
    const user = await User.findOne({ email: value })
    if (user) throw new Error('The email is already registered')
  }),
  body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
  body('confirm_password').custom((value, {req}) => {
    if (value !== req.body.password) throw new Error('Password does not match')
  }),
  userController.singup,
  userController.authenticateSignup
)

router.get('/signin', userController.newSingin)

router.post('/signin', userController.authenticateSignin)

router.get('/logout', userController.logout)

module.exports = router
