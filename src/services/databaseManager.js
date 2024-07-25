require('dotenv').config()
require('pretty-error').start()
const { MongoClient } = require('mongodb')
const ObjectID = require('mongodb').ObjectId


class DBManagerClass {
    constructor() {
        try{
            if (DBManagerClass.instance) {
                return DBManagerClass.instance
            }
            this.client = new MongoClient(process.env.MONGO_CONNECTION_STRING)
            this.connect()
            DBManagerClass.instance = this
        }catch(err){
            console.error(err)
            throw err
        }        
    }

    async connect() {
        try {
            await this.client.connect()
            this.db = this.client.db('MedHub')
            console.log(`Connected to "${this.db.databaseName}" database with MongoDB`)
        }catch(err) {
            console.error(err)
            throw err
        }
    }

    async disconnect() {
        try{
            await this.client.close()
        }catch(err) {
            console.error(err)
            throw err
        }
    }

    async insertOne(collectionName, document) {
        try{
            const collection = this.db.collection(collectionName)
            const result = await collection.insertOne(document)
            return result
        }catch(err) {
            console.error(err)
            throw err
        }
    }

    async findOne(collectionName, query) {
        try{
            const collection = this.db.collection(collectionName)
            const result = await collection.findOne(query)
            return result
        }catch(err) {
            console.error(err)
            throw err
        }
    }

    async findMany(collectionName, query) {
        try{
            const collection = this.db.collection(collectionName)
            const result = await collection.find(query)
            return result.toArray()
        }catch(err) {
            console.error(err)
            throw err
        }
    } 

    async updateOne(collectionName, query, update) {
        try{
            const collection = this.db.collection(collectionName)
            const result = await collection.updateOne(query, { $set: update })
            return result
        }catch(err) {
            console.error(err)
            throw err
        }
    }

    async deleteOne(collectionName, query) {
        try{
            const collection = this.db.collection(collectionName)
            const result = await collection.deleteOne(query)
            return result
        }catch(err) {
            console.error(err)
            throw err
        }
    }

    async deleteUser(id) {
        try{
            await this.deleteOne('Users', { '_id':new ObjectID(id) } )
            const findResult = await this.findOne('Users', { '_id':new ObjectID(id) } )
            if (findResult){
                return { 'status': 'failed' }
            } else {
                return { 'status': 'successful' }
            }
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }

    async getUserFollowing(id) {
        try{
            const findResult = await this.findMany('Following', { 'user':id } )
            if (findResult){
                return { 'status': 'successful', 'data': findResult.map(item => item.following) }
            } else {
                return { 'status': 'failed' }
            }
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }

    async checkLogin(inputUsername, inputPassword) {
        try{
            const findResult = await this.findOne('Users', { username: inputUsername, password: inputPassword } )
            if (findResult){
                return { 'status': 'successful', 'data': { 'userID': findResult['_id'] } }
            } else {
                return { 'status': 'rejected' }
            }
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }

    async getUsername(id) {
        try{
            const findResult = await this.findOne('Users', { '_id':new ObjectID(id) } )
            if (findResult){
                return { 'status': 'successful', 'data': { 'username': findResult['username'] } }
            } else {
                return { 'status': 'rejected' }
            }
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }

    async getEmail(id) {
        try{
            const findResult = await this.findOne('Users', { '_id':new ObjectID(id) } )
            if (findResult){
                return { 'status': 'successful', 'data': { 'email': findResult['email'] } }
            } else {
                return { 'status': 'rejected' }
            }
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }

    async getProfession(id) {
        try{
            const findResult = await this.findOne('Users', { '_id': new ObjectID(id) } )
            if (findResult){
                return { 'status': 'successful', 'data': { 'proStatus': findResult['proStatus'] } }
            } else {
                return { 'status': 'rejected' }
            }
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }


    async checkUsernameExists(inputUsername) {
        try{
            const findResult = await this.findOne('Users', { username: inputUsername } )
            return !!findResult
        }catch(err) {
            console.error(err)
            return false
        }
    }

    async checkEmailExists(inputMail) {
        try{
            const findResult = await this.findOne('Users', { email: inputMail } )
            return !!findResult
        }catch(err) {
            console.error(err)
            return false
        }
    }

    async registerUser(inUsername, inEmail, inPassword, inProStatus) {
        try{
            if(!(await this.checkEmailExists(inEmail)) && !(await this.checkUsernameExists(inUsername))){
                const result = await this.insertOne('Users', { username: inUsername, email: inEmail, password: inPassword, proStatus: inProStatus })
                if (result){
                    const newUserResult = await this.findOne('Users', { username: inUsername, email: inEmail, password: inPassword, proStatus: inProStatus } )
                    return { 'status': 'successful', 'data': { 'userID': newUserResult['_id'] } }
                } else {
                    return { 'status': 'failed' }
                }
            }else { 
                return { 'status': 'rejected' }
            }
            
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }

    async updateUserDetails(id, field, new_value) {
        try{
            let updateQuery = null
            let check = false
            if (field === 'username'){
                updateQuery = { username: new_value }
            } else if (field === 'email') {
                updateQuery = { email: new_value }
            } else if (field === 'profession') {
                updateQuery = { proStatus: new_value }
            } else {
                updateQuery = { password: new_value }
            }
            await this.updateOne('Users', { '_id': new ObjectID(id) }, updateQuery)
            const findResults = await this.findOne('Users', { '_id': new ObjectID(id) })
            if (field === 'username'){
                if (findResults.username === new_value){
                    check = true
                }
            } else if (field === 'email') {
                if (findResults.email === new_value){
                    check = true
                }
            } else if (field === 'profession') {
                if (findResults.proStatus === new_value){
                    check = true
                }
            } else {
                if (findResults.password === new_value){
                    check = true
                }
            }
            if (check) {
                return { 'status': 'successful' }
            }else{
                return { 'status': 'failed' }
            }
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }
}

const DBManager = new DBManagerClass()

module.exports = DBManager
