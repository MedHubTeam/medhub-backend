const express = require('express')
const userRouter = express.Router()
const DBManager = require('../services/databaseManager')

userRouter.get('/delete', async (req, res) => {
    const id = req.query.id
    res.send(await DBManager.deleteUser(id))
})

userRouter.get('/following', async (req, res) => {
    const id = req.query.id
    res.send(await DBManager.getUserFollowing(id))
})

module.exports = userRouter