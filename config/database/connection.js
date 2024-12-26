const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
});
module.exports = con;
