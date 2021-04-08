const express = require('express')
const users = require('./users-model')
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
  res.status(200).json(req.user)
})

router.post('/', validateUser, (req, res, next) => {
  const newUser = req.body
  users
    .insert(newUser)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(next)
})

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  const { id } = req.params
  const changes = req.body

  users
    .update(id, changes)
    .then(() => {
      return users.getById(id)
    })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', validateUserId, (req, res, next) => {
  const { id } = req.params

  users
    .remove(id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id/posts', validateUserId, (req, res, next) => {
  const { id } = req.params

  users
    .getUserPosts(id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
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
    customMessage: 'Something failed',
    message: err.message,
  })
})

module.exports = router
