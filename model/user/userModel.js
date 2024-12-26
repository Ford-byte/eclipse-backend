const con = require('../../config/database/connection');

class Model {
    // Get all users
    async getUsers() {
        const query = 'SELECT * FROM `user` WHERE 1';
        try {
            const [result] = await con.promise().query(query);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Get a specific user by username
    async getUser(username) {
        const query = 'SELECT id, password,role FROM `user` WHERE username = ? AND status = "active"';
        const data = [username];
        try {
            const [result] = await con.promise().query(query, data);
            return result[0];  // Assuming only one user will be returned
        } catch (err) {
            throw err;
        }
    }

    // Insert a new user
    async insertUser(data) {
        const query = 'INSERT INTO `user` (id, username, password) VALUES (?, ?, ?)';
        try {
            const [result] = await con.promise().query(query, data);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new Model();
