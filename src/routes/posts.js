const express = require('express')
const postsRouter = express.Router()
const DBManager = require('../services/databaseManager')

// Fetch all posts
postsRouter.get('/', async (req, res) => {
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
postsRouter.post('/', async (req, res) => {
    try {
        console.log('Received post data:', req.body)
        const { user_id, content } = req.body

        if (!user_id || !content) {
            return res.status(400).json({ error: 'User ID and content are required' })
        }

        // Assuming insertPost returns the new post object
        const result = await DBManager.insertPost(user_id, content)

        // Fetch the username for the post
        const user = await DBManager.getUsername(user_id)
        const postWithUser = { ...result.ops[0], username: user.data.username }

        console.log('Post saved:', postWithUser)
        res.status(201).json(postWithUser)
    } catch (err) {
        console.error('Error saving post:', err)
        res.status(500).json({ error: 'Failed to save post' })
    }
})

// Delete a post
postsRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await DBManager.deletePost(id)
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Post not found' })
        }
        console.log('Post deleted:', result) // Debug log for deleted post
        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (err) {
        console.error('Error deleting post:', err)
        res.status(500).json({ error: 'Failed to delete post' })
    }
})

// Edit a post
postsRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { content } = req.body

        if (!content) {
            return res.status(400).json({ error: 'Content is required' })
        }

        const result = await DBManager.updatePost(id, content)
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Post not found' })
        }

        // Assuming updatePost returns the updated post object
        const updatedPost = await DBManager.findOne('Posts', { '_id': new ObjectID(id) })
        const user = await DBManager.getUsername(updatedPost.user_id)
        const postWithUser = { ...updatedPost, username: user.data.username }

        console.log('Post updated:', postWithUser)
        res.status(200).json(postWithUser)
    } catch (err) {
        console.error('Error updating post:', err)
        res.status(500).json({ error: 'Failed to update post' })
    }
})

module.exports = postsRouter
