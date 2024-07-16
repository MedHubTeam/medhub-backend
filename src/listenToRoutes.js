module.exports = function(app){
    require('./utils/ping.js')(app)
    require('./content/about.js')(app)
}