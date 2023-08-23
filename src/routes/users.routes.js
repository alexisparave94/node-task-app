import { Router } from 'express'
import { body } from 'express-validator'

import userController from '../controllers/userController.js'
import User from '../models/User.js'

const router = Router()

router.get('/signup', userController.newSingup)

router.post('/signup',
  body('name').notEmpty().withMessage('Enter a name'), 
  body('email').notEmpty().withMessage('Enter an email').custom(async value => {
    const user = await User.findOne({ email: value })
    if (user) throw new Error('The email is already registered')
  }),
  body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
  body('confirm_password').notEmpty().withMessage('Enter a confirmation password').custom((value, {req}) => {
    if (value !== req.body.password) throw new Error('Password does not match')
    return true
  }),
  userController.singup,
  userController.authenticateSignup
)

router.get('/signin', userController.newSingin)

router.post('/signin', userController.authenticateSignin)

router.get('/logout', userController.logout)

export default router
