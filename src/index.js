const express = require('express')
const cors = require('cors')
const { port } = require('./config/config.js')

const app = express()

app.use(cors())
app.use(express.json())// For parsing JSON request bodies

require('./listenToRoutes.js')(app)

app.use('/user', require('./routes/user')) // This route is protected by the middleware

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
