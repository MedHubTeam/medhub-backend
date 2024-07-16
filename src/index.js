const express = require('express')
const fs = require('fs')
const { port, teamID, filePaths } = require('../src/config/config.js')

const app = express()


app.get('/ping', (req, res) => {
    res.send(`pong ${teamID}`)
})

app.get('/about', (req, res) => {
    fs.readFile(filePaths['about'], (err, data) => {
        if (err) {
            console.error(`Error reading ${filePaths['about']}:`, err)
        }else{
            res.send(JSON.parse(data))
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
