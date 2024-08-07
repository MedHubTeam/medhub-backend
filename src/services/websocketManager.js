const WebSocket = require('ws')

class WebSocketClass {
    constructor () {
        this.wss = null
        this.userConnections = new Map()
    }

    setup (server) {
        this.wss = new WebSocket.Server({ server })
        this.userConnections = new Map()

        this.wss.on('connection', (ws, request) => {
            const url = new URL(request.url, `http://${request.headers.host}`)
            const userId = url.searchParams.get('userId')
            const chatId = url.searchParams.get('chatId')
            const key = `${userId}:${chatId}`

            this.userConnections.set(key, ws)

            ws.on('close', () => {
                this.userConnections.delete(key)
            })
        })
    }

    sendMessageToChat (chatId, message) {
        if (this.wss) {
            this.userConnections.forEach((ws, key) => {
                const [, currentChatId] = key.split(':')
                if (currentChatId === chatId && ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(message))
                }
            })
        } else {
            console.warn('WebSocket server is not initialized')
        }
    }

    async newChatMessage (chatID, messageID) {
        this.sendMessageToChat(chatID, { chat_id: chatID, message_id: messageID })
    }
}

const WebSocketManager = new WebSocketClass()

module.exports = WebSocketManager
