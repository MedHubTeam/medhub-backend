const jsonPath = './src/json/'
const port = process.env.PORT || 4000
const teamID = 5
const filePaths = {
    'about': jsonPath + 'about.json'
}

module.exports = {
    port,
    teamID,
    filePaths
}