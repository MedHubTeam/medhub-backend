const express = require('express')
const postsRouter = express.Router()
const DBManager = require('../services/databaseManager')

postsRouter.get('/', async (req, res) => {
    const user_id = req.query.user_id
    if (user_id) {
        res.send(await DBManager.findUserPosts(user_id))
    } else {
        res.send(await DBManager.findAllPosts())
    }
})

postsRouter.get('/create', async (req, res) => {
    const user_id = req.query.user_id
    const content = req.query.content
    res.send(await DBManager.insertPost(user_id, content))
})

postsRouter.get('/delete', async (req, res) => {
    const id = req.query.id
    if (id) {
        res.send(await DBManager.deletePost(id))
    } else {
        res.send({ status: 'failed' })
    }
})

postsRouter.get('/edit', async (req, res) => {
    const id = req.query.id
    const content = req.query.content
    const result = await DBManager.updatePost(id, content)
    res.json(result)
})

postsRouter.get('/liked', async (req, res) => {
    const user_id = req.query.user_id
    res.send(await DBManager.findUserlikedPosts(user_id))
})

postsRouter.get('/saved', async (req, res) => {
    const user_id = req.query.user_id
    res.send(await DBManager.findUsersavedPosts(user_id))
})

postsRouter.get('/like', async (req, res) => {
    const user_id = req.query.user_id
    const post_id = req.query.post_id
    res.send(await DBManager.likePost(user_id, post_id))
})

postsRouter.get('/unlike', async (req, res) => {
    const user_id = req.query.user_id
    const post_id = req.query.post_id
    res.send(await DBManager.unlikePost(user_id, post_id))
})

postsRouter.get('/isliked', async (req, res) => {
    const user_id = req.query.user_id
    const post_id = req.query.post_id
    res.send(await DBManager.isLikedPost(user_id, post_id))
})

postsRouter.get('/save', async (req, res) => {
    const user_id = req.query.user_id
    const post_id = req.query.post_id
    res.send(await DBManager.savePost(user_id, post_id))
})

postsRouter.get('/unsave', async (req, res) => {
    const user_id = req.query.user_id
    const post_id = req.query.post_id
    res.send(await DBManager.unsavePost(user_id, post_id))
})

postsRouter.get('/issaved', async (req, res) => {
    const user_id = req.query.user_id
    const post_id = req.query.post_id
    res.send(await DBManager.isSavedPost(user_id, post_id))
})

postsRouter.get('/report', async (req, res) => {
    const post_id = req.query.post_id
    const user_id = req.query.user_id
    const reason = req.query.reason

    if (post_id && user_id && reason) {
        const result = await DBManager.reportPost(user_id, post_id, reason)
        res.send(result)
    } else {
        res.send({ status: 'failed', message: 'Missing parameters' })
    }
})

module.exports = postsRouter
