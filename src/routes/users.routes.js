const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')

router.get('/signup', userController.newSingup)

router.post('/signup', userController.singup, userController.authenticateSignup)

router.get('/signin', userController.newSingin)

router.post('/signin', userController.authenticateSignin)

router.get('/logout', userController.logout)

module.exports = router
