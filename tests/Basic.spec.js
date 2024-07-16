import { expect } from "chai"
import path from "path";
import { port, teamID, filePaths } from '../src/config/config.js'

describe("Test Variables", ()=>{
    describe("Test port variable", ()=>{
        it("Port should be 5555", ()=>{
            expect(port).to.be.eql(5555)
        })
    })

    describe("Test teamID variable", ()=>{
        it("TeamID should be 5", ()=>{
            expect(teamID).to.be.eql(5)
        })
    })
    
    describe("Test Json Paths", ()=>{
        describe("Test about.json path", ()=>{
            it("About should be included in filePaths", ()=>{
                expect(filePaths.hasOwnProperty('about')).to.be.true
            })
            it("File should be named 'about.json'", ()=>{
                expect(path.basename(filePaths['about'])).to.be.eql('about.json')
            })
        })
    })
})