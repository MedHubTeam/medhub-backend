const express = require('express')
const postsrouter = express.Router()
const DBManager = require('../services/databaseManager')

// Fetch all posts
postsrouter.get('/', async (req, res) => {
    try {
        const posts = await DBManager.findAllPosts()
        console.log('Fetched posts:', posts) // Debug log for fetched posts
        res.status(200).json(posts)
    } catch (err) {
        console.error('Error fetching posts:', err)
        res.status(500).json({ error: 'Failed to fetch posts' })
    }
})

// Save a new post
postsrouter.post('/', async (req, res) => {
    try {
        console.log('Received post data:', req.body) // Debug log for incoming data
        const { user_id, content } = req.body

        if (!user_id || !content) {
            return res.status(400).json({ error: 'User ID and content are required' })
        }

        const result = await DBManager.insertPost(user_id, content)
        console.log('Post saved:', result) // Debug log for saved post
        res.status(201).json(result)
    } catch (err) {
        console.error('Error saving post:', err)
        res.status(500).json({ error: 'Failed to save post' })
    }
})



module.exports = postsrouter
