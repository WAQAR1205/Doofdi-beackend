const express = require('express');
const router = express.Router();
const { register } = require('../controllers/register.controller');
const { login } = require('../controllers/login.controller');
// const passport = require('passport'); 


const { getUserInfo } = require('../controllers/getuserInfo.controller.js');
const { authenticateToken } = require('../middleware/authenticateToken');

router.post('/register', register);
router.post('/login', login);
router.post('/userinfo',"se");

module.exports = router;