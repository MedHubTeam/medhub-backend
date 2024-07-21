const existRouter = require('./routes/exist.js')
const aboutRouter = require('./routes/about.js')


module.exports = (app) => {
    app.use('/about', aboutRouter)
    app.use('/exist', existRouter)

    require('./utils/ping.js')(app)
    require('./services/login.js')(app)
    require('./services/register.js')(app)

}