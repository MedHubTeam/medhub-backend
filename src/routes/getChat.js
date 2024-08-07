const express = require('express')
const getRouter = express.Router()
const DBManager = require('../services/databaseManager')

getRouter.get('/dm', async (req, res) => {
    const user1 = req.query.user1
    const user2 = req.query.user2
    res.send(await DBManager.getDMChat(user1, user2))
})

getRouter.get('/messages', async (req, res) => {
    const chat_id = req.query.chat_id
    res.send(await DBManager.getChatMessages(chat_id))
})

getRouter.get('/message', async (req, res) => {
    const msg_id = req.query.msg_id
    res.send(await DBManager.getOneMessage(msg_id))
})

module.exports = getRouter