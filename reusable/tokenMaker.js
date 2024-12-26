const jwt = require('jsonwebtoken');

const tokenMaker = (id, username) => {
    const token = jwt.sign(
        { id, username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
    return token; // Return the generated token
};

module.exports = { tokenMaker }