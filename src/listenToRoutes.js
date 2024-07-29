const loginRouter = require('./routes/login.js')
const registerRouter = require('./routes/register.js')
const contentRouter = require('./routes/staticContent.js')
const userRouter = require('./routes/user.js')
const postsRouter = require('./routes/posts.js')

module.exports = (app) => {
    // Initialize routes
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/content', contentRouter)
    app.use('/user', userRouter)
    app.use('/api/posts', postsRouter)
    
    // Initialize functionality
    require('./utils/ping.js')(app)
    require('./utils/list.js')(app)
}