// requiring separate resolver files
const { AuthenticationError } = require('apollo-server-express');
const postResolvers = require('./resolvers/postResolvers');
const commentResolvers = require('./resolvers/commentResolvers');
const userResolvers = require('./resolvers/userResolvers');

// creating resolver function to query posts and mutations for posts, comments, and users
const resolvers = {
    Post: {
        // 
        postLikes: (l) => l.likes.length,
    },

    Query: {
        // referencing Query property from the postResolvers file
        ...postResolvers.Query,
    },

    Mutation: {
        // referencing the Mutation property from the comment, user, and post resolvers files
        ...commentResolvers.Mutation,
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
    },
};