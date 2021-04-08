const dotenv = require('dotenv').config()
const server = require('./api/server.js')
const express = require('express')

const path = require('path')
const port = process.env.PORT

server.use(express.static(path.join(__dirname, 'client/build')))

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
