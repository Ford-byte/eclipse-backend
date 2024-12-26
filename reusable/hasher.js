const bcrypt = require('bcrypt');

const passwordHasher = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (err) {
        throw new Error(err);
    }
}

const passwordCompare = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { passwordHasher, passwordCompare };
