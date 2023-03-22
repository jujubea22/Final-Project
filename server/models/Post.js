const User = require('./User');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
     content: String,
     username: String,
     createdAt: String,
     comments: [
        {
            content: String,
            username: String,
            createdAt: String,
        }
     ],
     likes: [
        {
            username: String,
            createAt: String,
        }
     ],
     user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
     }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;