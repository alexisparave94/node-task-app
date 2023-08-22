const { validationResult, Result } = require('express-validator');
const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ user_id: req.user._id }).sort({ date: 'desc' }).lean()
  res.render('tasks', { tasks })
}

const getNew = (req, res) => {
  res.render('tasks/new-task')
}

const createTask = async (req, res) => {
  const { title, description } = req.body
  const result = validationResult(req)

  if(result.isEmpty()) {
    const newTask = new Task({ title, description, user_id: req.user._id })
    await newTask.save()
    req.flash('success_msg', 'Task Created Successfully')
    res.redirect('/tasks')
  } else {
    res.render('tasks/new-task', {
      errors: [...result.array()],
      title,
      description
    })
  }
}

const getEdit = async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id).lean()
  res.render('tasks/edit-task', {task})
}

const updateTask = async (req, res) => {
  const { title, description } = req.body
  await Task.findByIdAndUpdate(req.params.id, { title, description })
  req.flash('success_msg', 'Task Updated Successfully')
  res.redirect('/tasks')
}

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Task Deleted Successfully')
  res.redirect('/tasks')
}

module.exports = {
  getAllTasks,
  getNew,
  createTask,
  getEdit,
  updateTask,
  deleteTask
}