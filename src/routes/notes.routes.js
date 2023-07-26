const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

router.get('/new', (req, res) => {
  res.render('notes/new-note')
})

router.post('/', async (req, res) => {
  const { title, description } = req.body
  const newNote = new Note({ title, description })
  await newNote.save()
  res.send('ok')
})

module.exports = router