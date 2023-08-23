import { Router } from 'express'

import indexController from '../controllers/indexController.js'

const router = Router()

router.get('/', indexController.index)

router.get('/about', indexController.about)

export default router