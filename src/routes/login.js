const express = require('express')
const loginRouter = express.Router()
const DBManager = require('../services/databaseManager')

loginRouter.get('/', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    res.send(await DBManager.checkLogin(username, password))
})

module.exports = loginRouter