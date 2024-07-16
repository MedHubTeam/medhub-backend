import express from 'express'

const app = express()
const port = 5151

app.get('/', (req, res) => {
    const response = '{"text": "Hello World"}'
    res.send(response)
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
