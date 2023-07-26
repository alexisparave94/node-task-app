const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('notes/new-note')
})

module.exports = router