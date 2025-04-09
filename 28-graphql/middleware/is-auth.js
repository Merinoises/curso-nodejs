const path = require('path');

const jwt = require('jsonwebtoken');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const JWT_PW = process.env.JWT_PW;

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_PW);
    } catch {
        error.statusCode = 500;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};