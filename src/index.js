const express = require('express')
const cors = require('cors')
const { port } = require('./config/config.js')
const { setupWebSocket } = require('./services/webSocket.js')

const app = express()

app.use(cors())
app.use(express.json())

// Load routes
require('./listenToRoutes')(app)

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })

    // Setup WebSocket server
    setupWebSocket(server)
}

module.exports = app
