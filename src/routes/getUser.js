const express = require('express')
const getUserRouter = express.Router()
const DBManager = require('../services/databaseManager')

getUserRouter.get('/username', async (req, res) => {
    const id = req.query.id
    res.send(await DBManager.getUsername(id))
})

getUserRouter.get('/email', async (req, res) => {
    const id = req.query.id
    res.send(await DBManager.getEmail(id))
})

getUserRouter.get('/profession', async (req, res) => {
    const id = req.query.id
    res.send(await DBManager.getProfession(id))
})

getUserRouter.get('/stats', async (req, res) => {
    const id = req.query.id
    res.send(await DBManager.getUserStats(id))
})

getUserRouter.get('/search', async (req, res) => {
    const input = req.query.input
    res.send(await DBManager.searchProfile(input))
})

module.exports = getUserRouter