const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
// import decode from 'jwt-decode';
const secret = 'supersecret';

module.exports = (context) => {
    const authenticationHeader = context.req.headers.authorization;
    // checking if there is authorization headers 
    if(authenticationHeader) {
        const token = authenticationHeader.split('Bearer ')[1];
        // if there is authorization headers check if there is a token
        if(token) {
            // if there is a token verify the token is valid
            const user = jwt.verify(token, secret);
            return user;
        }
    } else {
        // throw error if token is not valid or expired 
        throw new AuthenticationError('Invalid Token!');
    }

};