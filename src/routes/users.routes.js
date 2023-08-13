const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { body } = require('express-validator');

router.get('/signup', userController.newSingup)

router.post('/signup',
  body('name').notEmpty(), 
  body('email').notEmpty(),
  body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
  userController.singup,
  userController.authenticateSignup
)

router.get('/signin', userController.newSingin)

router.post('/signin', userController.authenticateSignin)

router.get('/logout', userController.logout)

module.exports = router
