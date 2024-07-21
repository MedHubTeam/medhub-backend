const express = require('express')
const existRouter = express.Router()
const DBManager = require('../services/databaseManager')


existRouter.get('/username', async (req, res) => {
    const username = req.query.username
    res.send(await DBManager.checkUsernameExists(username))
})

existRouter.get('/email', async (req, res) => {
    const email = req.query.email
    res.send(await DBManager.checkEmailExists(email))
})

module.exports = existRouter