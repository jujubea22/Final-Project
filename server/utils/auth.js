const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const secret = 'supersecret';

module.exports = (context) => {
    const authToken = context.req.headers.authorization;

    if(authToken) {
        const userToken = authToken.split('Bearer ')[1];
            // if the user is authenticated return the user information
            if(userToken) {
                const user = jwt.verify(userToken, secret);
                return user;
                // if the user cannot be authenticated/token is expired then throw error
            } else {
                throw new Error('Token is Expired!');
            }
    } else {
        // if there is no authorization headers then throw error
        throw new AuthenticationError('Error with Authentication');
    }
};

