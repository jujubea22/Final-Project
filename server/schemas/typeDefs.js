const { gql } = require('apollo-server-express');

module.exports = gql`
    type Post {
        _id: ID!
        content: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        like: [Like]!
    }
    type Comment {
        _id: ID!
        createdAt: String!
        content: String!
        username: String!
    }
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        createdAt: String!
    }
    type Like {
        _id: ID!
        username: String!
        createdAt: String!
    }
    type Query {
        getPosts: [Post]
        getSinglePost(postId: ID!): Post
    }
    type Mutation {
        register(userInput: UserInput): User!
        login(username: String!, password: String!): User!
        createAPost(content: String!): Post!
        deleteAPost(postId: ID): String!
        createComment(postId: ID!, content: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likeAPost(postId: ID!): Post!
    }

`;