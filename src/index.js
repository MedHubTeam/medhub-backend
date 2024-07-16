import express from 'express'
import fs from 'fs'

const jsonPath = './src/json/'
const app = express()
const port = 5151

app.get('/ping', (req, res) => {
    res.send('pong 5')
});

app.get('/about', (req, res) => {
    const fileName = 'about.json'
    fs.readFile(jsonPath + fileName, (err, data) => {
        if (err) {
            console.error(`Error reading ${fileName}:`, err);
        }else{
            res.send(JSON.parse(data));
        }
    })
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
