const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true }, // Ensure content is of type String
    timestamp: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
