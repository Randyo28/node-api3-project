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

router.get('/', (req, res) => {
  users
    .get()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(() => {
      res.status(500).json({ message: 'Error getting users' })
    })
})

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
})

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body
  users
    .insert(newUser)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(() => {
      res.status(500).json({ message: "Can't post new user" })
    })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
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
    .catch(() => {
      res.status(500).json({ message: 'Error' })
    })
})

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params

  users
    .remove(id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(() => {
      res.status(500).json({ message: 'Error with deleting user' })
    })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params

  posts
    .getById(id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch(() => {
      res.status(500).json({ message: 'Error getting posts' })
    })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params
  const create = req.body

  posts
    .insert(id, create)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch(() => {
      res.status(500).json({ message: "Can't post comment" })
    })
})

// do not forget to export the router
module.exports = router
