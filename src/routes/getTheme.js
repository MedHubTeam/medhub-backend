const express = require('express')
const getThemeRouter = express.Router()
const DBManager = require('../services/databaseManager')

// Route to get the user's theme preference
getThemeRouter.get('/', async (req, res) => {
    const userId = req.query.id

    try {
        const theme = await DBManager.getUserTheme(userId)
        if (theme.status === 'successful') {
            res.json({ dark: theme.data.dark })
        } else {
            res.status(404).json({ error: 'Theme not found' })
        }
    } catch (error) {
        console.error('Error fetching theme:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = getThemeRouter
