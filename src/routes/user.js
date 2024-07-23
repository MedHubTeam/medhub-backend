const express = require('express')
const userRouter = express.Router()
const DBManager = require('../services/databaseManager')

userRouter.get('/delete', async (req, res) => {
    const id = req.query.id
    res.send(await DBManager.deleteUser(id))
})

module.exports = userRouter