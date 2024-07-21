const DBManager = require('./databaseManager.js')

/**
 * @param {import('express').Application} app
 */
module.exports = (app) => {
    app.get('/register', async (req, res) => {
        const username = req.query.username
        const email = req.query.email
        const password = req.query.password
        const proStatus = req.query.prostatus
        res.send(await DBManager.registerUser(username, email, password, proStatus))
    })
}