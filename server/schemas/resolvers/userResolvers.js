const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const { AuthenicationError } = require('apollo-server-express');
const secret  = 'super secret'; 
const expiration = '2h';
const createdStamp = new Date().toISOString();

// using jwt 
function signToken(user) {
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
    },
    secret,
    {
        expiresIn: expiration,
    },
    );
};

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
                    throw new AuthenicationError('Incorrect Username/Password!');
                }
            const token = signToken(user);
            // returning users token and user data 
            return { token, ...user._doc};
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.findOne({ username });
            const newUser = new User({ username, email, password, createdAt: createdStamp });
            // if statement to check is username is taken
            if(user) {
                throw new Error('Username is taken! Please choose another username.')
            }
            const token = signToken(data);
            const data = await newUser.save();
            // returning token for registered user along with id and newuser data
            return { token, id: data._id, ...data._doc };
        }
    }
};