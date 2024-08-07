const express = require('express')
const chatRouter = express.Router()
const getRouter = express.Router()
const createRouter = express.Router()
const DBManager = require('../services/databaseManager')
const WebSocketManager = require('../services/websocketManager')

createRouter.get('/dm', async (req, res) => {
    const user1 = req.query.user1
    const user2 = req.query.user2
    res.send(await DBManager.createDMChat(user1, user2))
})

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

createRouter.get('/message', async (req, res) => {
    const chat_id = req.query.chat_id
    const user_id = req.query.user_id
    const msg = req.query.msg
    const dbResult = await DBManager.addMessageToChat(chat_id, user_id, msg)
    WebSocketManager.newChatMessage(chat_id, dbResult['new_msg'])
    res.send(dbResult)
})

chatRouter.use('/get', getRouter)
chatRouter.use('/create', createRouter)
module.exports = chatRouter