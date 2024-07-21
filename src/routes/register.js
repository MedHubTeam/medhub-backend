const express = require('express')
const registerRouter = express.Router()
const DBManager = require('../services/databaseManager.js')

registerRouter.get('/', async (req, res) => {
    const username = req.query.username
    const email = req.query.email
    const password = req.query.password
    const proStatus = req.query.prostatus
    res.send(await DBManager.registerUser(username, email, password, proStatus))
})

registerRouter.get('/exist', async (req, res) => {
    const username = req.query.username
    const email = req.query.email
    if(username){
        res.send(await DBManager.checkUsernameExists(username))
    }else if(email){
        res.send(await DBManager.checkEmailExists(email))
    }else {
        res.send('Please send an email or username to check')
    }
})

module.exports = registerRouter