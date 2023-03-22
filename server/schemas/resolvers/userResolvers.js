const User = require("../../models/User");
const { AuthenicationError } = require('apollo-server-express');
const { signToken } = require('../../utils/auth');


module.exports = {
    // mutation to allow a user to login or to add a new user 
    Mutation: {
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
                if(!user) {
                    throw new AuthenicationError('User Not Found!')
                }
            const correctPW = await user.isCorrectPassword(password);
                if(!correctPW) {
                    throw new AuthenicationError('Incorrect Credentials!');
                }
            const token = signToken;
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        }
    }
};