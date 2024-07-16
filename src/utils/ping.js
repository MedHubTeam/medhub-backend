const { teamID } = require('../config/config.js')

/**
 * @param {import('express').Application} app
 */
module.exports = function(app){
    app.get('/ping', (req, res) => {
        res.send(`pong ${teamID}`)
    })
}