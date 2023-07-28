const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const { isAuthenticated } = require('../helpers/auth')

router.get('/', isAuthenticated, async (req, res) => {
  const tasks = await Task.find({ user_id: req.user._id }).sort({ date: 'desc' }).lean()
  res.render('tasks', { tasks })
})

router.get('/new', isAuthenticated, (req, res) => {
  res.render('tasks/new-task')
})

router.post('/', isAuthenticated, async (req, res) => {
  const { title, description } = req.body
  const errors = []

  if(!title) errors.push({ message: 'Please write a title' })
  if(!description) errors.push({ message: 'Please write a description' })

  if(errors.length > 0) {
    res.render('tasks/new-task', { errors, title, description })
  } else {
    const newTask = new Task({ title, description, user_id: req.user._id })
    await newTask.save()
    req.flash('success_msg', 'Task Created Successfully')
    res.redirect('/tasks')
  }
})

router.get('/:id/edit', isAuthenticated, async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id).lean()
  res.render('tasks/edit-task', {task})
})

router.put('/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body
  await Task.findByIdAndUpdate(req.params.id, { title, description })
  req.flash('success_msg', 'Task Updated Successfully')
  res.redirect('/tasks')
})

router.delete('/:id', isAuthenticated, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Task Deleted Successfully')
  res.redirect('/tasks')
})

module.exports = router