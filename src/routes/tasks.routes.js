const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')
const taskController = require('../controllers/taskController')

router.get('/', isAuthenticated, taskController.getAllTasks)

router.get('/new', isAuthenticated, taskController.getNew)

router.post('/', isAuthenticated, taskController.createTask)

router.get('/:id/edit', isAuthenticated, taskController.getEdit)

router.put('/:id', isAuthenticated, taskController.updateTask)

router.delete('/:id', isAuthenticated, taskController.deleteTask)

module.exports = router