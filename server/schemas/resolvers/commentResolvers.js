const { AuthenicationError } = require('apollo-server-express');
const signToken = require('../../utils/auth');

const Post = require('../../models/Post');

module.exports = {
    Mutation: {
        newComment: async(parent, { postId, content }, context) => {
            const { username } = signToken(context);
            const post = await Post.findById(postId);

            const newPost = { 
                content, 
                username, 
                createdAt: new Date().toISOString()
            }
            if(post) {
                post.comments.unshift(newPost);
                await post.save()
                return post;
            } else {
                throw new Error('No Post Found!')
            };
        },
        deleteComment: async(parent, { postId, content }, context) => {
            const { username } = signToken(context);
            const post = await Post.findById(postId);

            // if there is a post do the following
            if(post) {
                // finding the comments for a post from an array index and 
                const commentArr = post.comments.findIndex((comment) => comment.id === commentId);
                // if the comment belongs/was posted by the user
                if(post.comments[commentArr].username === username) {
                    // removing 1 element from the commentArr that belongs to the username
                    post.comments.splice(commentArr, 1)
                    await post.save();
                    return post;
                } else {
                    throw new AuthenicationError('Not Authorized to Delete Comment!')
                }
            } else {
                throw new Error('No Post Found!')
            }
        }
    }
};