import { Router } from 'express'
import { isAuthenticated } from '../helpers/auth.js'
import taskController from '../controllers/taskController.js'
import { taskValidationRules,
         createTaskValidationHandler,
         updateTaskValidationHandler
} from '../validators/taskValidator.js'

const router = Router()

router.get('/', isAuthenticated, taskController.getAllTasks)

router.get('/new', isAuthenticated, taskController.getNew)

router.post('/',
  isAuthenticated,
  taskValidationRules(),
  createTaskValidationHandler,
  taskController.createTask
)

router.get('/:id/edit', isAuthenticated, taskController.getEdit)

router.put('/:id',
  isAuthenticated,
  taskValidationRules(),
  updateTaskValidationHandler,
  taskController.updateTask
)

router.delete('/:id', isAuthenticated, taskController.deleteTask)

export default router