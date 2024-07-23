const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')
const DBManager = require('../../databaseManager')

// Route to delete user account
router.delete('/', authMiddleware, async (req, res) => {
    try {
        const result = await DBManager.deleteOne('Users', { _id: req.user.id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router
