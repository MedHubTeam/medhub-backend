import express from 'express'
import fs from 'fs'
import { port, teamID, filePaths } from './config/config.js'

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
