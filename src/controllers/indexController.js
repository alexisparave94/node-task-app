const index = (req, res) => {
  res.render('index')
}

const about = (req, res) => {
  res.render('about')
}

export default {
  index,
  about
}