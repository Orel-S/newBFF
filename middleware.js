const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env'});
const secret = process.env.SECRET;

const withAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                console.log({decoded});
                next();
            }
        });
    }
}

module.exports = withAuth;