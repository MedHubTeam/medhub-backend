require('dotenv').config()
require('pretty-error').start()
const { MongoClient } = require('mongodb')
const ObjectID = require('mongodb').ObjectId

class DBManagerClass {
    constructor() {
        try {
            if (DBManagerClass.instance) {
                return DBManagerClass.instance
            }
            this.client = new MongoClient(process.env.MONGO_CONNECTION_STRING)
            this.connect()
            DBManagerClass.instance = this
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async connect() {
        try {
            await this.client.connect()
            this.db = this.client.db('MedHub')
            console.log(
                `Connected to "${this.db.databaseName}" database with MongoDB`
            )
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async disconnect() {
        try {
            await this.client.close()
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async insertOne(collectionName, document) {
        try {
            const collection = this.db.collection(collectionName)
            return await collection.insertOne(document)
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async findOne(collectionName, query) {
        try {
            const collection = this.db.collection(collectionName)
            return await collection.findOne(query)
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async findMany(collectionName, query) {
        try {
            const collection = this.db.collection(collectionName)
            const result = await collection.find(query)
            return result.toArray()
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async updateOne(collectionName, query, update) {
        try {
            const collection = this.db.collection(collectionName)
            return await collection.updateOne(query, { $set: update })
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async deleteOne(collectionName, query) {
        try {
            const collection = this.db.collection(collectionName)
            return await collection.deleteOne(query)
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async deleteUser(id) {
        try {
            await this.deleteOne('Users', { _id: new ObjectID(id) })
            const findResult = await this.findOne('Users', { _id: new ObjectID(id) })
            if (findResult) {
                return { status: 'failed' }
            } else {
                return { status: 'successful' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getUserFollowing(id) {
        try {
            const findResult = await this.findMany('Following', { user: id })
            if (findResult) {
                return {
                    status: 'successful',
                    data: findResult.map((item) => item.following),
                }
            } else {
                return { status: 'failed' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async checkLogin(inputUsername, inputPassword) {
        try {
            const findResult = await this.findOne('Users', {
                username: inputUsername,
                password: inputPassword,
            })
            if (findResult) {
                return { status: 'successful', data: { userID: findResult['_id'] } }
            } else {
                return { status: 'rejected' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getUsername(id) {
        try {
            const findResult = await this.findOne('Users', { _id: new ObjectID(id) })
            if (findResult) {
                return {
                    status: 'successful',
                    data: { username: findResult['username'] },
                }
            } else {
                return { status: 'rejected' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getEmail(id) {
        try {
            const findResult = await this.findOne('Users', { _id: new ObjectID(id) })
            if (findResult) {
                return { status: 'successful', data: { email: findResult['email'] } }
            } else {
                return { status: 'rejected' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getProfession(id) {
        try {
            const findResult = await this.findOne('Users', { _id: new ObjectID(id) })
            if (findResult) {
                return {
                    status: 'successful',
                    data: { proStatus: findResult['proStatus'] },
                }
            } else {
                return { status: 'rejected' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async checkUsernameExists(inputUsername) {
        try {
            const findResult = await this.findOne('Users', {
                username: inputUsername,
            })
            return !!findResult
        } catch (err) {
            console.error(err)
            return false
        }
    }

    async checkEmailExists(inputMail) {
        try {
            const findResult = await this.findOne('Users', { email: inputMail })
            return !!findResult
        } catch (err) {
            console.error(err)
            return false
        }
    }

    async registerUser(inUsername, inEmail, inPassword, inProStatus) {
        try {
            if (
                !(await this.checkEmailExists(inEmail)) &&
        !(await this.checkUsernameExists(inUsername))
            ) {
                const result = await this.insertOne('Users', {
                    username: inUsername,
                    email: inEmail,
                    password: inPassword,
                    proStatus: inProStatus,
                })
                if (result) {
                    const newUserResult = await this.findOne('Users', {
                        username: inUsername,
                        email: inEmail,
                        password: inPassword,
                        proStatus: inProStatus,
                    })
                    return {
                        status: 'successful',
                        data: { userID: newUserResult['_id'] },
                    }
                } else {
                    return { status: 'failed' }
                }
            } else {
                return { status: 'rejected' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async updateUserDetails(id, field, new_value) {
        try {
            let updateQuery = null
            let check = false
            if (field === 'username') {
                updateQuery = { username: new_value }
            } else if (field === 'email') {
                updateQuery = { email: new_value }
            } else if (field === 'profession') {
                updateQuery = { proStatus: new_value }
            } else {
                updateQuery = { password: new_value }
            }
            await this.updateOne('Users', { _id: new ObjectID(id) }, updateQuery)
            const findResults = await this.findOne('Users', {
                _id: new ObjectID(id),
            })
            if (field === 'username') {
                if (findResults.username === new_value) {
                    check = true
                }
            } else if (field === 'email') {
                if (findResults.email === new_value) {
                    check = true
                }
            } else if (field === 'profession') {
                if (findResults.proStatus === new_value) {
                    check = true
                }
            } else {
                if (findResults.password === new_value) {
                    check = true
                }
            }
            if (check) {
                return { status: 'successful' }
            } else {
                return { status: 'failed' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async removefollower(id, following) {
        try {
            await this.deleteOne('Following', { user: id, following: following })
            const findResult = await this.findOne('Following', {
                user: id,
                following: following,
            })
            if (findResult) {
                return { status: 'failed' }
            } else {
                return { status: 'successful' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async insertPost(userId, content) {
        try {
            const postDocument = {
                user_id: new ObjectID(userId),
                content: content,
                timestamp: new Date(),
            }
            const createpost = await this.insertOne('Posts', postDocument)
            if (createpost) {
                return { status: 'failed' }
            } else {
                return { status: 'successful' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async findAllPosts() {
        try {
            const posts = await this.findMany('Posts', {})

            const userIds = posts.map((post) => post.user_id)

            const users = await this.findMany('Users', { _id: { $in: userIds } })
            const userMap = users.reduce((map, user) => {
                map[user._id] = user
                return map
            }, {})

            posts.forEach((post) => {
                post.username = userMap[post.user_id]
                    ? userMap[post.user_id].username
                    : null
            })
            return posts
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async findUserPosts(id) {
        try {
            const posts = await this.findMany('Posts', { user_id: new ObjectID(id) })

            const userIds = posts.map((post) => post.user_id)

            const users = await this.findMany('Users', { _id: { $in: userIds } })
            const userMap = users.reduce((map, user) => {
                map[user._id] = user
                return map
            }, {})

            posts.forEach((post) => {
                post.username = userMap[post.user_id]
                    ? userMap[post.user_id].username
                    : null
            })
            return posts
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async deletePost(postId) {
        try {
            const deletepost = await this.deleteOne('Posts', {
                _id: new ObjectID(postId),
            })
            if (deletepost) {
                return { status: 'failed' }
            } else {
                return { status: 'successful' }
            }
        } catch (err) {
            console.error('Error deleting post:', err)
            throw err
        }
    }

    async updatePost(postId, content) {
        try {
            const updatepost = await this.updateOne(
                'Posts',
                { _id: new ObjectID(postId) },
                { content: content }
            )
            if (updatepost) {
                return { status: 'failed' }
            } else {
                return { status: 'successful' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async updatePassword(id, oldpass, newpass) {
        try {
            const findResult = await this.findOne('Users', {
                _id: new ObjectID(id),
                password: oldpass,
            })
            if (findResult) {
                await this.updateOne(
                    'Users',
                    { _id: new ObjectID(id), password: oldpass },
                    { password: newpass }
                )
                return { status: 'successful' }
            } else {
                return { status: 'rejected' }
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getPostLikes(post_id) {
        try {
            const postResult = await this.findMany('Likes', {
                post_id: new ObjectID(post_id),
            })
            return postResult.length
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getUserStats(id) {
        try {
            const getFollowingAmount = async () => {
                const findResult = await this.findMany('Following', { user: id })
                return findResult.length
            }

            const getFollowersAmount = async () => {
                const findResult = await this.findMany('Following', { following: id })
                return findResult.length
            }

            const getLikesRecivedAmount = async () => {
                let likesTotal = 0
                const userPosts = await this.findUserPosts(id)
                for (const post of userPosts) {
                    likesTotal += await this.getPostLikes(post['_id'])
                }
                return likesTotal
            }

            const getLikesSentAmount = async () => {
                const findResult = await this.findMany('Likes', {
                    user_id: new ObjectID(id),
                })
                return findResult.length
            }

            const getPostsCreatedAmount = async () => {
                const findResult = await this.findMany('Posts', {
                    user_id: new ObjectID(id),
                })
                return findResult.length
            }

            const getPostsSavedAmount = async () => {
                const findResult = await this.findMany('Saves', {
                    user_id: new ObjectID(id),
                })
                return findResult.length
            }

            return {
                status: 'successful',
                data: {
                    following: await getFollowingAmount(),
                    followers: await getFollowersAmount(),
                    likesRecived: await getLikesRecivedAmount(),
                    likesSent: await getLikesSentAmount(),
                    postsCreated: await getPostsCreatedAmount(),
                    saves: await getPostsSavedAmount(),
                },
            }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async findUserlikedPosts(id) {
        try {
            const likedPosts = await this.findMany('Likes', {
                user_id: new ObjectID(id),
            })
            const postIds = likedPosts.map((like) => like.post_id)

            const posts = await this.findMany('Posts', {
                _id: { $in: postIds.map((temp_id) => new ObjectID(temp_id)) },
            })

            const userIds = posts.map((post) => post.user_id)

            const users = await this.findMany('Users', { _id: { $in: userIds } })
            const userMap = users.reduce((map, user) => {
                map[user._id] = user
                return map
            }, {})

            posts.forEach((post) => {
                post.username = userMap[post.user_id]
                    ? userMap[post.user_id].username
                    : null
            })
            return posts
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async findUsersavedPosts(id) {
        try {
            const savedPosts = await this.findMany('Saves', {
                user_id: new ObjectID(id),
            })
            const postIds = savedPosts.map((save) => save.post_id)

            const posts = await this.findMany('Posts', {
                _id: { $in: postIds.map((temp_id) => new ObjectID(temp_id)) },
            })

            const userIds = posts.map((post) => post.user_id)

            const users = await this.findMany('Users', { _id: { $in: userIds } })
            const userMap = users.reduce((map, user) => {
                map[user._id] = user
                return map
            }, {})

            posts.forEach((post) => {
                post.username = userMap[post.user_id]
                    ? userMap[post.user_id].username
                    : null
            })
            return posts
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async createDMChat(user1, user2) {
        try {
            const chatData = await this.insertOne('Chats', { messages: [] })
            const dmData = await this.insertOne('DMs', { user1: new ObjectID(user1), user2: new ObjectID(user2), chat_id: new ObjectID(chatData.insertedId) })
            if (dmData.acknowledged) {
                return { status: 'successful' }
            }
            return { status: 'failed' }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getDMChat(user1, user2) {
        try {
            let dmData
            dmData = await this.findOne('DMs', { user1: new ObjectID(user1), user2: new ObjectID(user2) })
            if (!dmData){
                dmData = await this.findOne('DMs', { user1: new ObjectID(user2), user2: new ObjectID(user1) }) 
            }
            if (dmData) {
                return { status: 'successful', data: { chat_id: dmData['chat_id'] } }
            }
            return { status: 'failed' }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getChatMessages(chatID) {
        try {
            const chatData = await this.findOne('Chats', { _id: new ObjectID(chatID) })
            if (chatData) {
                let messages = []
                for(const msg of chatData['messages']) {
                    const msgData = await this.findOne('Messages', { _id: new ObjectID(msg) })
                    const userData = await this.findOne('Users', { _id: new ObjectID(msgData['user_id']) })
                    messages.push({ username: userData['username'], message: msgData['content'], timestamp: msgData['timestamp'] })
                }
                return { status: 'successful', data: { messages: messages } }
            }
            return { status: 'failed' }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async addMessageToChat(chatID, userID, msg) {
        try {
            const msgData = await this.insertOne('Messages', { user_id: new ObjectID(userID), content: msg, timestamp: new Date() })
            const chatData = await this.findOne('Chats', { _id: new ObjectID(chatID) })
            if (chatData) {
                const messages = chatData['messages']
                messages.push(new ObjectID(msgData.insertedId))
                const updatedData = await this.updateOne('Chats', { _id: new ObjectID(chatID) }, { messages: messages })
                return { status: 'successful', 'data': updatedData, new_msg: msgData.insertedId }
            }
            return { status: 'failed' }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getChatData(chatID) {
        try {
            const chatData = await this.findOne('Chats', { _id: new ObjectID(chatID) })
            if (chatData) {
                return { status: 'successful', data: chatData }
            }
            return { status: 'failed' }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }

    async getOneMessage(msgID) {
        try {
            const msgData = await this.findOne('Messages', { _id: new ObjectID(msgID) })
            if (msgData) {
                const userData = await this.findOne('Users', { _id: new ObjectID(msgData['user_id']) })
                return { status: 'successful', data: { user_id: msgData['user_id'], username: userData['username'], message: msgData['content'], timestamp: msgData['timestamp'] } }
            }
            return { status: 'failed' }
        } catch (err) {
            console.error(err)
            return { status: 'failed' }
        }
    }
}


const DBManager = new DBManagerClass()

module.exports = DBManager
