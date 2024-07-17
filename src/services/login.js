const DBManager = require('./databaseManager.js')

/**
 * @param {import('express').Application} app
 */
module.exports = function(app){
    app.get('/login', async (req, res) => {
        const username = req.query.username
        const password = req.query.password
        res.send(await DBManager.checkLogin(username, password))
    })
}