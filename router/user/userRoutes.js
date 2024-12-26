const express = require('express');
const userController = require('../../controller/user/userController');
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/find/:username', userController.getUser);
router.post('/signup', userController.insertUser);
router.post('/signin', userController.userLogin);

module.exports = router;
