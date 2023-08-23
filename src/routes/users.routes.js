import { Router } from 'express'

import userController from '../controllers/userController.js'
import { singUpValidationRules, singUpValidationHandler } from '../validators/userValidator.js'

const router = Router()

router.get('/signup', userController.newSingup)

router.post('/signup',
  singUpValidationRules(),
  singUpValidationHandler,
  userController.singup,
  userController.authenticateSignup
)

router.get('/signin', userController.newSingin)

router.post('/signin', userController.authenticateSignin)

router.get('/logout', userController.logout)

export default router
