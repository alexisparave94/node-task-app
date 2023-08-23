import { body, validationResult } from 'express-validator'

import User from '../models/User.js'

export const singUpValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Enter a name'), 
    body('email').notEmpty().withMessage('Enter an email').custom(async value => {
      const user = await User.findOne({ email: value })
      if (user) throw new Error('The email is already registered')
    }),
    body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
    body('confirm_password').notEmpty().withMessage('Enter a confirmation password').custom((value, {req}) => {
      if (value !== req.body.password) throw new Error('Password does not match')
      return true
    })  
  ]
}

export const singUpValidationHandler = (req, res, next) => {
  const { name, email, password, confirm_password } = req.body
  const result = validationResult(req)
  if (result.isEmpty()) return next();
  
  res.render('users/signup', {
    errors: result.array(),
    name,
    email,
    password,
    confirm_password
  })
}