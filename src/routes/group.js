const express = require('express')
const groupRouter = express.Router()
const DBManager = require('../services/databaseManager')

groupRouter.get('/create', async (req, res) => {
    const name = req.query.name
    const topic = req.query.topic
    const owner = req.query.owner
    res.send(await DBManager.createGroupChat(name, topic, owner))
})

groupRouter.get('/delete', async (req, res) => {
    const group_id = req.query.group_id
    res.send(await DBManager.deleteGroup(group_id))
})

groupRouter.get('/join', async (req, res) => {
    const group_id = req.query.group_id
    const user_id = req.query.user_id
    res.send(await DBManager.joinGroup(group_id, user_id))
})

groupRouter.get('/leave', async (req, res) => {
    const group_id = req.query.group_id
    const user_id = req.query.user_id
    res.send(await DBManager.leaveGroup(group_id, user_id))
})

groupRouter.get('/getgroup', async (req, res) => {
    const group_id = req.query.group_id
    res.send(await DBManager.getGroupChat(group_id))
})

groupRouter.get('/getuser', async (req, res) => {
    const user_id = req.query.user_id
    res.send(await DBManager.getUserGroups(user_id))
})

groupRouter.get('/getall', async (req, res) => {
    res.send(await DBManager.getAllGroups())
})

module.exports = groupRouter