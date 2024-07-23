const express = require('express')
const userDetailsRouter = express.Router()
const DBManager = require('../../databaseManager')
const authenticate = require('../middleware/authenticate') // Adjust the path if you have an authentication middleware

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await DBManager.findOne('Users', { _id: req.user.id })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router
