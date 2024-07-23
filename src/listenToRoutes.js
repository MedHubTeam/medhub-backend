const loginRouter = require('./routes/login.js')
const registerRouter = require('./routes/register.js')
const contentRouter = require('./routes/staticContent.js')
const userDetailsRouter = require('./routes/user/getUserDetails.js') 
const deleteUserRouter = require('./routes/user/deleteUser.js')

module.exports = (app) => {
    // Initialize routes
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/content', contentRouter)
    app.use('/api/getUserDetails', userDetailsRouter)
    app.use('/api/deleteUser', deleteUserRouter)

    // Initialize ping functionality
    require('./utils/ping.js')(app)
}