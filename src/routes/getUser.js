const express = require('express')
const getUserRouter = express.Router()
const DBManager = require('../services/databaseManager')

getUserRouter.get('/username', async (req, res) => {
    const id = req.query.id
    res.send(await DBManager.getUsername(id))
})

module.exports = getUserRouter