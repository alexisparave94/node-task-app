import { body, validationResult } from 'express-validator'

export const taskValidationRules = () => {
  return [
    body('title')
      .notEmpty().withMessage('Enter a title')
      .isLength({ max: 30 }).withMessage('Title must not have more the 30 characters'),
    body('description').notEmpty().withMessage('Enter a description')
  ]
}

export const createTaskValidationHandler = (req, res, next) => {
  const { title, description } = req.body
  const result = validationResult(req)

  if (result.isEmpty()) return next()

  res.render('tasks/new-task', {
    errors: result.array(),
    title,
    description
  })
}

export const updateTaskValidationHandler = (req, res, next) => {
  const { title, description } = req.body
  const result = validationResult(req)

  if (result.isEmpty()) return next()

  res.render('tasks/edit-task', {
    errors: result.array(),
    _id: req.params.id,
    title,
    description
  })
}