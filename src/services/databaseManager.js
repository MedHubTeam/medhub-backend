require('dotenv').config()
require('pretty-error').start()
const { MongoClient } = require('mongodb')


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

    async updateOne(collectionName, query, update) {
        try{
            const collection = this.db.collection(collectionName)
            const result = await collection.updateOne(query, update)
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

    async checkLogin(inputUsername, inputPassword) {
        try{
            const findResult = await this.findOne('Users', { username: inputUsername, password: inputPassword } )
            if (findResult){
                return { 'status': 'successful', 'data': { 'userID': findResult['_id'], 'username': findResult['username'] } }
            } else {
                return { 'status': 'rejected' }
            }
        }catch(err) {
            console.error(err)
            return { 'status': 'failed' }
        }
    }
}

const dbManager = new DBManagerClass()

module.exports = dbManager
