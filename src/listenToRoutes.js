module.exports = (app) => {
    require('./utils/ping.js')(app)
    require('./content/about.js')(app)
    require('./services/login.js')(app)
}