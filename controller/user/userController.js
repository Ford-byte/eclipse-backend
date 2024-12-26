const userModel = require('../../model/user/userModel');
const { v4: uuidv4 } = require('uuid');
const { passwordHasher, passwordCompare } = require('../../reusable/hasher');
const { tokenMaker } = require('../../reusable/tokenMaker');

class Controller {
    async getUsers(req, res) {
        try {
            const response = await userModel.getUsers();
            res.status(200).json({ message: "Data fetched successfully", data: response });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!", error: error.message });
        }
    }

    async getUser(req, res) {
        const username = req.params.username;
        try {
            const response = await userModel.getUser(username);
            res.status(200).json({ message: "Data fetched successfully", data: response });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!", error: error });
        }
    }

    async userLogin(req, res, next) {
        const { username, password } = req.body;

        try {
            const user = await userModel.getUser(username);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const verified = await passwordCompare(password, user.password);

            if (!verified) {
                return res.status(401).json({ message: "Password is incorrect" });
            }
            const token = tokenMaker(user.id, user.username);

            res.status(200).json({
                message: "Login successful",
                role: user.role,
                token: token,
            });
        } catch (error) {
            next(error);
        }
    }


    async insertUser(req, res) {
        const { username, password } = req.body;
        const id = uuidv4();

        try {
            const hashPassword = await passwordHasher(password);
            const data = [id, username, hashPassword];
            await userModel.insertUser(data);

            res.status(200).json({ message: "Data inserted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!", error: error.message });
        }
    }


}

module.exports = new Controller();
