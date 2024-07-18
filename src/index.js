const express = require('express')
const cors = require('cors')
const { port } = require('./config/config.js')

const app = express()

app.use(cors())

require('./listenToRoutes.js')(app)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
