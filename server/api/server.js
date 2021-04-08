const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { logger } = require('./middleware/middleware')

const userRouter = require('./users/users-router')
const server = express()

server.use(express.json())

server.use(morgan('dev'))
server.use(cors())
server.use('/api/users', logger, userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server
