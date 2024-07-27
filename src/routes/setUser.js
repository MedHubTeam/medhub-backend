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

setUserRouter.post('/username', async (req, res) => {
    const { id, newUsername } = req.body
    try {
        const result = await DBManager.updateUserDetails(id, 'username', newUsername)
        res.json(result)
    } catch (error) {
        res.status(500).json({ status: 'failed', error: error.message })
    }
})

setUserRouter.post('/email', async (req, res) => {
    const { id, newEmail } = req.body
    try {
        const result = await DBManager.updateUserDetails(id, 'email', newEmail)
        res.json(result)
    } catch (error) {
        res.status(500).json({ status: 'failed', error: error.message })
    }
})

setUserRouter.post('/profession', async (req, res) => {
    const { id, newProfession } = req.body
    try {
        const result = await DBManager.updateUserDetails(id, 'profession', newProfession)
        res.json(result)
    } catch (error) {
        res.status(500).json({ status: 'failed', error: error.message })
    }
})

module.exports = setUserRouter