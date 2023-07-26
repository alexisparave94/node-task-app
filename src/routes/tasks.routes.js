const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/', async (req, res) => {
  const tasks = Task.find()
  res.render('tasks')
})

router.get('/new', (req, res) => {
  res.render('tasks/new-task')
})

router.post('/', async (req, res) => {
  const { title, description } = req.body
  const errors = []

  if(!title) errors.push({ message: 'Please write a title' })
  if(!description) errors.push({ message: 'Please write a description' })

  if(errors.length > 0) {
    res.render('tasks/new-task', { errors, title, description })
  } else {
    const newTask = new Task({ title, description })
    await newTask.save()
    res.redirect('/tasks')
  }
})

module.exports = router