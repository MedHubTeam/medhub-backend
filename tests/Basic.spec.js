const path = require('path')
const { port, teamID, filePaths } = require('../src/config/config.js')

describe('Test Variables', () => {
    describe('Test teamID variable', () => {
        it('TeamID should be 5', () => {
            expect(teamID).toEqual(5)
        })
    })

    describe('Test Json Paths', () => {
        describe('Test about.json path', () => {
            it('About should be included in filePaths', () => {
                expect(filePaths).toHaveProperty('about')
            })

            it('File should be named "about.json"', () => {
                expect(path.basename(filePaths['about'])).toEqual('about.json')
            })
        })
    })
})
