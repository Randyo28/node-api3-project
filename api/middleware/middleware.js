const posts = require('../posts/posts-model')
const users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`This ${req.method}, is coming from ${req.url}
  at ${Date.now()}`)

  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params

  users
    .getById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'user not found' })
      } else {
        req.user = user
        next()
      }
    })
    .catch((e) => {
      res.status(500).json(e.message)
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing required name field' })
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Missing required post field' })
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required post field' })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
