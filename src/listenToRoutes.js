const loginRouter = require('./routes/login.js')
const registerRouter = require('./routes/register.js')
const contentRouter = require('./routes/staticContent.js')

module.exports = (app) => {
    // Initialize routes
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/content', contentRouter)

    // Initialize ping functionality
    require('./utils/ping.js')(app)
}