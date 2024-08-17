const express = require('express')
const setThemeRouter = express.Router()
const DBManager = require('../services/databaseManager')

setThemeRouter.post('/', async (req, res) => {
    const userId = req.query.id
    const darkMode = req.query.dark === 'true'

    const result = await DBManager.setUserTheme(userId, darkMode)
    res.send(result)
})

setThemeRouter.get('/getTheme', async (req, res) => {
    const userId = req.query.id
    const result = await DBManager.getUserTheme(userId)
    res.send(result)
})

module.exports = setThemeRouter
