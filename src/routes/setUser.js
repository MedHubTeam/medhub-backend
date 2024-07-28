const express = require('express')
const setUserRouter = express.Router()
const DBManager = require('../services/databaseManager')

setUserRouter.get('/username', async (req, res) => {
    const id = req.query.id
    const value = req.query.value
    res.send(await DBManager.updateUserDetails(id, 'username', value))
})

setUserRouter.get('/email', async (req, res) => {
    const id = req.query.id
    const value = req.query.value
    res.send(await DBManager.updateUserDetails(id, 'email', value))
})

setUserRouter.get('/profession', async (req, res) => {
    const id = req.query.id
    const value = req.query.value
    res.send(await DBManager.updateUserDetails(id, 'profession', value))
})

module.exports = setUserRouter