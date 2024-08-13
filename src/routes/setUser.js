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

setUserRouter.get('/unfollow', async (req, res) => {
    const id = req.query.id
    const following = req.query.following
    res.send(await DBManager.removefollower(id, following))
})

setUserRouter.get('/follow', async (req, res) => {
    const id = req.query.id
    const follow = req.query.follow
    res.send(await DBManager.addFollower(id, follow))
})

setUserRouter.get('/isfollowing', async (req, res) => {
    const id = req.query.id
    const following = req.query.following
    res.send(await DBManager.isFollowing(id, following))
})

setUserRouter.get('/password', async (req, res) => {
    const id = req.query.id
    const oldpass = req.query.oldpass
    const newpass = req.query.newpass
    res.send(await DBManager.updatePassword(id, oldpass, newpass))
})


module.exports = setUserRouter