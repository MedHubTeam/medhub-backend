const express = require('express')
const chatRouter = express.Router()
const getRouter = require('./getChat')
const createRouter = require('./chatCreate')


chatRouter.use('/get', getRouter)
chatRouter.use('/create', createRouter)
module.exports = chatRouter