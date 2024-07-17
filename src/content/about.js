const fs = require('fs')
const { filePaths } = require('../config/config.js')

/**
 * @param {import('express').Application} app
 */
module.exports = (app) => {
    app.get('/about', (req, res) => {
        fs.readFile(filePaths['about'], (err, data) => {
            if (err) {
                console.error(`Error reading ${filePaths['about']}:`, err)
                res.status(500).send('Internal Server Error')
            } else {
                res.send(JSON.parse(data))
            }
        })
    })
}
