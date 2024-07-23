const express = require('express')
const userDetailsRouter = express.Router()
const DBManager = require('../../services/databaseManager')
const authenticate = require('../middleware/authenticate') // Adjust the path if you have an authentication middleware

// Endpoint to get current user details
userDetailsRouter.get('/user-details', authenticate, async (req, res) => {
    try {
        const userId = req.user.id // Assuming req.user is populated by the authenticate middleware
        const user = await DBManager.findOne('Users', { _id: userId })
        if (user) {
            res.json({
                username: user.username,
                email: user.email,
                profession: user.profession
            })
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = userDetailsRouter
