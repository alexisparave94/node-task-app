import { Router } from 'express'
import { body } from 'express-validator'

import { isAuthenticated } from '../helpers/auth.js'
import taskController from '../controllers/taskController.js'

const router = Router()

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

// module.exports = router
export default router