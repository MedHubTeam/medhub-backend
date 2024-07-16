const express = require('express')
const { port } = require('./config/config.js')

const app = express()

require('./listenToRoutes.js')(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
