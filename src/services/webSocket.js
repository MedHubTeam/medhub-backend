const WebSocket = require('ws')

let wss

const setupWebSocket = (server) => {
    wss = new WebSocket.Server({ server })
    
    wss.on('connection', (ws) => {
        console.log('New client connected')
        broadcastMessage("hello world")

        ws.on('message', (message) => {
            console.log(`Received message => ${message}`)
        })

        ws.on('close', () => {
            console.log('Client disconnected')
        })
    })

    return wss
}

const broadcastMessage = (message) => {
    if (wss){
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message))
            }
        })
    }
}

module.exports = {
  setupWebSocket,
  broadcastMessage
}
