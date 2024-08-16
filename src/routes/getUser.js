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

getUserRouter.get('/search-profile', async (req, res) => {
    try {
        const { username, email } = req.query
        let query = {}

        // Build query based on provided parameters
        if (username) {
            query.username = { $regex: new RegExp(username, 'i') }
        }
        if (email) {
            query.email = { $regex: new RegExp(email, 'i') } 
        }

        const result = await DBManager.searchProfile(query)

        if (result.status === 'successful') {
            res.status(200).json(result.data)
        } else if (result.status === 'not_found') {
            res.status(404).json({ message: 'Profile not found' })
        } else {
            res.status(500).json({ message: 'Failed to search profile' })
        }
    } catch (error) {
        console.error('Error in /search-profile route:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = getUserRouter