const express = require('express')
const contentRouter = express.Router()

const fs = require('fs')
const { filePaths } = require('../config/config.js')

contentRouter.get('/about', (req, res) => {
    fs.readFile(filePaths['about'], (err, data) => {
        if (err) {
            console.error(`Error reading ${filePaths['about']}:`, err)
            res.status(500).send('Internal Server Error')
        } else {
            res.send(JSON.parse(data))
        }
    })
})

module.exports = contentRouter