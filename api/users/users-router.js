// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const express = require('express')
const users = require('../users/users-model')
const posts = require('../posts/posts-model')

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
  users
    .get()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
})

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body
  users
    .insert(newUser)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) => {
      next(err)
    })
})

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params
  const changes = req.body

  users
    .update(id, changes)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params

  users
    .remove(id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params

  posts
    .getById(id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = { ...req.body, user_id: req.params.id }

  posts
    .insert(postInfo)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      next(err)
    })
})

router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something failed',
    error: err.message,
  })
})

// do not forget to export the router
module.exports = router
