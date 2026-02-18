/**
 * @file auth.js
 * @description Handles user authentication, including login and JWT generation.
 */

const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport'); // Your local passport file 

/**
 * Generates a JWT token for a user.
 * @function generateJWTToken
 * @param {Object} user - The user object to encode in the token.
 * @returns {string} - A signed JWT token.
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // This is the username you're encoding in the JWT
        expiresIn: '7d', // Token expires in 7 days
        algorithm: 'HS256' // Algorithm used to sign the JWT
    });
}

/**
 * POST: Handles user login.
 * @name Login
 * @kind function
 * @param {Object} router - The Express router.
 * @description
 * Authenticates the user using the 'local' strategy.
 * If successful, generates and returns a JWT token.
 */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
}