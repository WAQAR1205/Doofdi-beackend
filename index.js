const express = require('express');
const router = express.Router();
const { register } = require('../controllers/register.controller');
const { login } = require('../controllers/login.controller'); 


const { getUserInfo } = require('../controllers/getuserInfo.controller');
const { authenticateToken } = require('../middleware/authenticateToken');

router.post('/register', register);
router.post('/login', login);
router.post('/userinfo',authenticateToken,getUserInfo);

module.exports = router;