require('dotenv').config()
const { run } = require('jest')
const { MongoClient } = require('mongodb')

class DBManagerClass {
    constructor() {
        if (DBManagerClass.instance) {
            return DBManagerClass.instance
        }
        this.client = new MongoClient(process.env.MONGO_CONNECTION_STRING)
        this.connect()
        DBManagerClass.instance = this
    }

    async connect() {
        await this.client.connect()
        this.db = this.client.db('MedHub')
        console.log(`Connected to "${this.db.databaseName}" database with MongoDB`)
    }

    async disconnect() {
        await this.client.close()
    }

    async insertOne(collectionName, document) {
        const collection = this.db.collection(collectionName)
        const result = await collection.insertOne(document)
        return result
    }

    async findOne(collectionName, query) {
        const collection = this.db.collection(collectionName)
        const result = await collection.findOne(query)
        return result
    }

    async updateOne(collectionName, query, update) {
        const collection = this.db.collection(collectionName)
        const result = await collection.updateOne(query, update)
        return result
    }

    async deleteOne(collectionName, query) {
        const collection = this.db.collection(collectionName)
        const result = await collection.deleteOne(query)
        return result
    }

    async checkLogin(inputUsername, inputPassword) {
        const findResult = await this.findOne('Users', {username: inputUsername, password: inputPassword})
        if (findResult){
            const result = Object.assign({'status': 'success'}, findResult)
            return result
        } else {
            return {'status': 'failed'}
        }
    }
}

const dbManager = new DBManagerClass()

module.exports = dbManager