const fs = require('fs')
const { filePaths } = require('../config/config.js')

const express = require('express');
const aboutRouter = express.Router();

aboutRouter.get('/', (req, res) => {
    fs.readFile(filePaths['about'], (err, data) => {
        if (err) {
            console.error(`Error reading ${filePaths['about']}:`, err)
            res.status(500).send('Internal Server Error')
        } else {
            res.send(JSON.parse(data))
        }
    })
})

module.exports = aboutRouter