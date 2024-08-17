const loginRouter = require('./routes/login.js')
const registerRouter = require('./routes/register.js')
const contentRouter = require('./routes/staticContent.js')
const userRouter = require('./routes/user.js')
const postsRouter = require('./routes/posts.js')
const chatRouter = require('./routes/chat.js')
const groupRouter = require('./routes/group.js')
const setThemeRouter = require('./routes/setTheme')
const getThemeRouter = require('./routes/getTheme')

module.exports = (app) => {
    // Initialize routes
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/content', contentRouter)
    app.use('/user', userRouter)
    app.use('/posts', postsRouter)
    app.use('/chats', chatRouter)
    app.use('/groups', groupRouter)
    app.use('/setTheme', setThemeRouter)
    app.use('/getTheme', getThemeRouter)
    
    // Initialize functionality
    require('./utils/ping.js')(app)
    require('./utils/list.js')(app)
}