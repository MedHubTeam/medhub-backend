/**
 * @param {import('express').Application} app
 */
module.exports = function(app){
    app.get('/login', (req, res) => {
        const username = req.query.username
        const password = req.query.password
        const response = `{"action": "login", "fields": {"username": "${username}", "password": "${password}"}}`
        res.send(JSON.parse(response))
    })
}