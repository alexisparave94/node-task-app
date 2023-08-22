const express = require('express')
const { body } = require('express-validator');
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')
const taskController = require('../controllers/taskController')

router.get('/', isAuthenticated, taskController.getAllTasks)

router.get('/new', isAuthenticated, taskController.getNew)

router.post('/',
  isAuthenticated,
  body('title').notEmpty().withMessage('Enter a title').isLength({ max: 30 }).withMessage('Title must not have more the 30 characters'),
  body('description').notEmpty().withMessage('Enter a description'),
  taskController.createTask)

router.get('/:id/edit', isAuthenticated, taskController.getEdit)

router.put('/:id',
isAuthenticated,
body('title').notEmpty().withMessage('Enter a title').isLength({ max: 30 }).withMessage('Title must not have more the 30 characters'),
  body('description').notEmpty().withMessage('Enter a description'),
taskController.updateTask)

router.delete('/:id', isAuthenticated, taskController.deleteTask)

module.exports = router